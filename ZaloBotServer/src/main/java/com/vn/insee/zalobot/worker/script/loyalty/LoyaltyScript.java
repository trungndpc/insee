package com.vn.insee.zalobot.worker.script.loyalty;

import com.vn.insee.zalobot.entity.ConstructionEntity;
import com.vn.insee.zalobot.entity.CustomerEntity;
import com.vn.insee.zalobot.entity.PromotionEntity;
import com.vn.insee.zalobot.exception.EmptyWaitingQuestionException;
import com.vn.insee.zalobot.exception.ScriptNotStartedException;
import com.vn.insee.zalobot.service.ConstructionService;
import com.vn.insee.zalobot.worker.script.Question;
import com.vn.insee.zalobot.worker.script.loyalty.document.ConstructionLoyaltyDocument;
import com.vn.insee.zalobot.worker.script.loyalty.question.*;
import com.vn.insee.zalobot.worker.script.upload_bill.SessionUploadBillScript;
import com.vn.insee.zalobot.worker.script.upload_bill.question.AddressQuestion;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgWebhook;
import com.vn.insee.zalobot.zalo.ZaloService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.List;
import java.util.Optional;

public class LoyaltyScript  {
    private static final Logger LOGGER = LogManager.getLogger(LoyaltyScript.class);
    private CustomerEntity user;
    private PromotionEntity promotionEntity;
    private SessionUploadBillScript sessionScript;

    public boolean process(ZMsgWebhook zMsgWebhook) throws Exception {
        if (sessionScript == null) {
            throw new ScriptNotStartedException();
        }
        Optional<Question> waitingQuestion = sessionScript.getWaitingQuestion();
        if (!waitingQuestion.isPresent()) {
            throw new EmptyWaitingQuestionException();
        }
        Question question = waitingQuestion.get();
        if (question instanceof OldConstructionLoyaltyQuestion) {
            OldConstructionLoyaltyQuestion oldAddressLoyaltyQuestion = (OldConstructionLoyaltyQuestion) question;
            boolean ans = oldAddressLoyaltyQuestion.ans(zMsgWebhook);
            sessionScript.pushOrReplace(oldAddressLoyaltyQuestion);
            if (ans) {
                Integer constructionId = oldAddressLoyaltyQuestion.getConstructionId();
                if (constructionId == 0) {
                    AddressLoyaltyQuestion addressLoyaltyQuestion = new AddressLoyaltyQuestion();
                    ZMsg zMsg = addressLoyaltyQuestion.build2Ask();
                    sessionScript.pushOrReplace(addressLoyaltyQuestion);
                    ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
                } else {
                    NumberOfBagLoyaltyQuestion numberOfBagLoyaltyQuestion = new NumberOfBagLoyaltyQuestion();
                    ZMsg zMsg = numberOfBagLoyaltyQuestion.build2Ask();
                    sessionScript.pushOrReplace(numberOfBagLoyaltyQuestion);
                    ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
                }
            }
        } else if (question instanceof AddressLoyaltyQuestion) {
            AddressLoyaltyQuestion addressQuestion = (AddressLoyaltyQuestion) question;
            boolean ans = addressQuestion.ans(zMsgWebhook);
            sessionScript.pushOrReplace(addressQuestion);
            if (ans) {
                SquareLoyaltyQuestion squareLoyaltyQuestion = new SquareLoyaltyQuestion();
                ZMsg zMsg = squareLoyaltyQuestion.build2Ask();
                sessionScript.pushOrReplace(squareLoyaltyQuestion);
                ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
            }
        } else if (question instanceof SquareLoyaltyQuestion) {
            SquareLoyaltyQuestion squareLoyaltyQuestion = (SquareLoyaltyQuestion) question;
            boolean ans = squareLoyaltyQuestion.ans(zMsgWebhook);
            sessionScript.pushOrReplace(squareLoyaltyQuestion);
            if (ans) {
                NumberFloorLoyaltyQuestion numberFloorLoyaltyQuestion = new NumberFloorLoyaltyQuestion();
                ZMsg zMsg = numberFloorLoyaltyQuestion.build2Ask();
                sessionScript.pushOrReplace(numberFloorLoyaltyQuestion);
                ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
            }
        } else if (question instanceof NumberFloorLoyaltyQuestion) {
            NumberFloorLoyaltyQuestion numberFloorLoyaltyQuestion = (NumberFloorLoyaltyQuestion) question;
            boolean ans = numberFloorLoyaltyQuestion.ans(zMsgWebhook);
            sessionScript.pushOrReplace(numberFloorLoyaltyQuestion);
            if (ans) {
                IsMixCementLoyaltyQuestion isMixCementLoyaltyQuestion = new IsMixCementLoyaltyQuestion();
                ZMsg zMsg = isMixCementLoyaltyQuestion.build2Ask();
                sessionScript.pushOrReplace(isMixCementLoyaltyQuestion);
                ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
            }
        } else if (question instanceof IsMixCementLoyaltyQuestion) {
            IsMixCementLoyaltyQuestion isMixCementLoyaltyQuestion = (IsMixCementLoyaltyQuestion) question;
            boolean ans = isMixCementLoyaltyQuestion.ans(zMsgWebhook);
            sessionScript.pushOrReplace(isMixCementLoyaltyQuestion);
            if (ans) {
                CementLoyaltyQuestion cementLoyaltyQuestion = new CementLoyaltyQuestion(promotionEntity.getRuleAcceptedCement());
                ZMsg zMsg = cementLoyaltyQuestion.build2Ask();
                sessionScript.pushOrReplace(cementLoyaltyQuestion);
                ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
            }
        } else if (question instanceof CementLoyaltyQuestion) {
            CementLoyaltyQuestion cementLoyaltyQuestion = (CementLoyaltyQuestion) question;
            boolean ans = cementLoyaltyQuestion.ans(zMsgWebhook);
            sessionScript.pushOrReplace(cementLoyaltyQuestion);
            if (ans) {
                NumberOfBagLoyaltyQuestion numberOfBagLoyaltyQuestion = new NumberOfBagLoyaltyQuestion();
                ZMsg zMsg = numberOfBagLoyaltyQuestion.build2Ask();
                sessionScript.pushOrReplace(numberOfBagLoyaltyQuestion);
                ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
            }
        } else if (question instanceof NumberOfBagLoyaltyQuestion) {
            NumberOfBagLoyaltyQuestion numberOfBagLoyaltyQuestion = (NumberOfBagLoyaltyQuestion) question;
            boolean ans = numberOfBagLoyaltyQuestion.ans(zMsgWebhook);
            sessionScript.pushOrReplace(numberOfBagLoyaltyQuestion);
            if (ans) {
                Question sessionQuestion = sessionScript.getQuestion(SquareLoyaltyQuestion.class);
                if (sessionQuestion == null) {
                    BillLoyaltyQuestion billLoyaltyQuestion = new BillLoyaltyQuestion();;
                    ZMsg zMsg = billLoyaltyQuestion.build2Ask();
                    sessionScript.pushOrReplace(billLoyaltyQuestion);
                    ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
                } else {
                    ImageLoyaltyQuestion imageLoyaltyQuestion = new ImageLoyaltyQuestion();
                    ZMsg zMsg = imageLoyaltyQuestion.build2Ask();
                    sessionScript.pushOrReplace(imageLoyaltyQuestion);
                    ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
                }
            }
        } else if (question instanceof ImageLoyaltyQuestion) {
            ImageLoyaltyQuestion imageLoyaltyQuestion = (ImageLoyaltyQuestion) question;
            boolean ans = imageLoyaltyQuestion.ans(zMsgWebhook);
            sessionScript.pushOrReplace(imageLoyaltyQuestion);
        } else if (question instanceof BillLoyaltyQuestion) {
            BillLoyaltyQuestion billLoyaltyQuestion = (BillLoyaltyQuestion) question;
            boolean ans = billLoyaltyQuestion.ans(zMsgWebhook);
            sessionScript.pushOrReplace(billLoyaltyQuestion);
        }
        return true;
    }

    public boolean start() throws Exception{
        if (sessionScript != null) {
            Optional<Question> waitingQuestion = sessionScript.getWaitingQuestion();
            if (!waitingQuestion.isPresent()) {
                throw new EmptyWaitingQuestionException();
            }
            Question question = waitingQuestion.get();
            ZMsg zMsg = question.build2Ask();
            ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
            return true;
        }
        sessionScript = new SessionUploadBillScript();
        List<ConstructionEntity> constructionEntities = ConstructionService.INSTANCE.findConstruction(promotionEntity.getId(), user.getId());
        List<ConstructionLoyaltyDocument> constructionLoyaltyDocuments = ConvertEntity2LoyaltyDocumentScript.convert2Documents(constructionEntities);
        if (constructionLoyaltyDocuments == null) {
            AddressLoyaltyQuestion addressLoyaltyQuestion = new AddressLoyaltyQuestion();
            ZMsg zMsg = addressLoyaltyQuestion.build2Ask();
            sessionScript.pushOrReplace(addressLoyaltyQuestion);
            ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
        }else {
            OldConstructionLoyaltyQuestion oldConstructionLoyaltyQuestion = new OldConstructionLoyaltyQuestion(constructionLoyaltyDocuments);
            ZMsg zMsg = oldConstructionLoyaltyQuestion.build2Ask();
            sessionScript.pushOrReplace(oldConstructionLoyaltyQuestion);
            ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
        }
        return true;
    }
}
