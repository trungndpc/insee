package com.vn.insee.zalobot.worker.script.find_promotion;

import com.vn.insee.zalobot.common.status.CustomerStatus;
import com.vn.insee.zalobot.customer.CSessionManager;
import com.vn.insee.zalobot.entity.CustomerEntity;
import com.vn.insee.zalobot.entity.PromotionEntity;
import com.vn.insee.zalobot.service.PromotionService;
import com.vn.insee.zalobot.worker.script.Question;
import com.vn.insee.zalobot.worker.script.find_promotion.document.PromotionDocument;
import com.vn.insee.zalobot.worker.script.find_promotion.question.PromotionDetailQuestion;
import com.vn.insee.zalobot.worker.script.find_promotion.question.PromotionQuestion;
import com.vn.insee.zalobot.worker.script.find_promotion.question.UnfinishedQuestion;
import com.vn.insee.zalobot.worker.script.find_promotion.reply.NoPromotionReply;
import com.vn.insee.zalobot.worker.script.find_promotion.reply.WaitingApprovalReply;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgWebhook;
import com.vn.insee.zalobot.zalo.ZaloService;
import com.vn.insee.zalobot.zalo.webhook.msg.TextMsg;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.List;
import java.util.Optional;


public class FindPromotionScript {
    private static final Logger LOGGER = LogManager.getLogger(FindPromotionScript.class);
    private CustomerEntity user;
    private SessionFindPromotionScript sessionScript;

    public boolean isCanApply(ZMsgWebhook zMsgWebhook) {
        if (zMsgWebhook instanceof TextMsg) {
            TextMsg textMsg = (TextMsg) zMsgWebhook;
            String text = textMsg.message.text;
            if ("#promotion".equals(text)) {
                return true;
            }
            if (sessionScript != null && sessionScript.getWaitingQuestion() != null) {
                return true;
            }
        }
        return false;
    }

    public boolean process(ZMsgWebhook zMsgWebhook) {
        try {
            TextMsg textMsg = (TextMsg) zMsgWebhook;
            Optional<Question> optWaitingQuestion = sessionScript.getWaitingQuestion();
            String text = textMsg.message.text;
            if ("#promotion".equals(text)) {
                if (user.getStatus() != CustomerStatus.APPROVED.getStatus()) {
                    WaitingApprovalReply waitingApprovalReply = new WaitingApprovalReply();
                    ZMsg zMsg = waitingApprovalReply.build();
                    ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
                    return true;
                }

                List<PromotionEntity> promotionEntities = PromotionService.INSTANCE.find(user.getId());
                List<PromotionDocument> promotionDocuments = ConvertEntity2DocumentScript.convert2Documents(promotionEntities);
                if (promotionDocuments == null || promotionDocuments.isEmpty()) {
                    NoPromotionReply noPromotionReply = new NoPromotionReply();
                    ZMsg zMsg = noPromotionReply.build();
                    ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
                    return true;
                }

                sessionScript = new SessionFindPromotionScript();
                PromotionQuestion promotionQuestion = new PromotionQuestion(promotionDocuments);
                ZMsg zMsg = promotionQuestion.build2Ask();
                sessionScript.pushOrReplace(promotionQuestion);
                ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
                return true;
            }

            if (optWaitingQuestion.isPresent()) {
                Question question = optWaitingQuestion.get();
                if (question instanceof PromotionQuestion) {
                    PromotionQuestion promotionQuestion = (PromotionQuestion) question;
                    boolean ans = promotionQuestion.ans(zMsgWebhook);
                    sessionScript.pushOrReplace(promotionQuestion);
                    if (ans) {
                        PromotionDocument selectedProDoc = promotionQuestion.getSelectedPromotionDocument();
                        if (CSessionManager.INSTANCE.hasScriptUnfinished()) {
                            UnfinishedQuestion unfinishedQuestion = new UnfinishedQuestion();
                            ZMsg zMsg = unfinishedQuestion.build2Ask();
                            ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
                            sessionScript.pushOrReplace(unfinishedQuestion);
                        } else {
                            PromotionDetailQuestion promotionDetailQuestion = new PromotionDetailQuestion(selectedProDoc);
                            ZMsg zMsg = promotionDetailQuestion.build2Ask();
                            sessionScript.pushOrReplace(promotionDetailQuestion);
                            ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
                        }
                        return true;
                    }

                } else if (question instanceof PromotionDetailQuestion) {
                    PromotionDetailQuestion promotionDetailQuestion = (PromotionDetailQuestion) question;
                    boolean ans = promotionDetailQuestion.ans(zMsgWebhook);
                    sessionScript.pushOrReplace(promotionDetailQuestion);
                    //store session before dispatch other even
                    //Todo
                    if (ans) {
                        //Todo
                        return true;
                    }
                } else if (question instanceof UnfinishedQuestion) {
                    UnfinishedQuestion unfinishedQuestion = (UnfinishedQuestion) question;
                    boolean ans = unfinishedQuestion.ans(zMsgWebhook);
                    sessionScript.pushOrReplace(unfinishedQuestion);
                    if (ans) {
                        int action = unfinishedQuestion.getAction();
                        if (action == UnfinishedQuestion.MAKE_NEW_FORM) {
                            PromotionQuestion promotionQuestion = (PromotionQuestion) sessionScript.getQuestion(PromotionQuestion.class);
                            PromotionDocument promotionDocument = promotionQuestion.getSelectedPromotionDocument();
                            PromotionDetailQuestion promotionDetailQuestion = new PromotionDetailQuestion(promotionDocument);
                            ZMsg zMsg = promotionDetailQuestion.build2Ask();
                            sessionScript.pushOrReplace(promotionDetailQuestion);
                            ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);

                        } else if (action == UnfinishedQuestion.CONTINUE_EXITS_FORM) {
                            //Todo
                        }
                        return true;
                    }
                }
                return true;
            }
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
        return false;
    }
}
