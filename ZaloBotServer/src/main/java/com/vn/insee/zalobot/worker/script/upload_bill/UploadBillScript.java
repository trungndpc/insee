package com.vn.insee.zalobot.worker.script.upload_bill;

import com.vn.insee.zalobot.entity.CustomerEntity;
import com.vn.insee.zalobot.entity.PromotionEntity;
import com.vn.insee.zalobot.exception.EmptyWaitingQuestionException;
import com.vn.insee.zalobot.exception.ScriptNotStartedException;
import com.vn.insee.zalobot.worker.script.Question;
import com.vn.insee.zalobot.worker.script.upload_bill.question.*;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgWebhook;
import com.vn.insee.zalobot.zalo.ZaloService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


import java.util.List;
import java.util.Optional;

public class UploadBillScript {
    private static final Logger LOGGER = LogManager.getLogger(UploadBillScript.class);
    private CustomerEntity user;
    private PromotionEntity promotionEntity;
    private SessionUploadBillScript sessionScript;

    public boolean isCanApply(ZMsgWebhook zMsgWebhook){
        return true;
    }

    public boolean process(ZMsgWebhook zMsgWebhook) throws Exception {
        if (sessionScript == null) {
            throw new ScriptNotStartedException();
        }
        Optional<Question> waitingQuestion = sessionScript.getWaitingQuestion();
        if (!waitingQuestion.isPresent()) {
            throw new EmptyWaitingQuestionException();
        }
        Question question = waitingQuestion.get();
            if (question instanceof AddressQuestion) {
                AddressQuestion addressQuestion = (AddressQuestion) question;
                boolean ans = addressQuestion.ans(zMsgWebhook);
                sessionScript.pushOrReplace(question);
                if (ans) {
                    PhoneRetailerQuestion phoneRetailerQuestion = new PhoneRetailerQuestion();
                    ZMsg zMsg = phoneRetailerQuestion.build2Ask();
                    ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
                    sessionScript.pushOrReplace(phoneRetailerQuestion);
                }
            }else if (question instanceof PhoneRetailerQuestion) {
                PhoneRetailerQuestion phoneRetailerQuestion = (PhoneRetailerQuestion) question;
                boolean ans = phoneRetailerQuestion.ans(zMsgWebhook);
                sessionScript.pushOrReplace(question);
                if (ans) {
                    List<Integer> ruleAcceptedCement = promotionEntity.getRuleAcceptedCement();
                    CementQuestion cementQuestion = new CementQuestion(ruleAcceptedCement);
                    ZMsg zMsg = cementQuestion.build2Ask();
                    ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
                    sessionScript.pushOrReplace(cementQuestion);
                }
            }else if (question instanceof CementQuestion) {
                CementQuestion cementQuestion = (CementQuestion) question;
                boolean ans = cementQuestion.ans(zMsgWebhook);
                sessionScript.pushOrReplace(question);
                if (ans) {
                    if (promotionEntity.getRuleAcceptedCement() != null
                            && promotionEntity.getRuleAcceptedCement().size() > 1) {
                        askNumberOfBag();
                    }else {
                        askBill();
                    }
                }
            }else if (question instanceof NumberOfBagQuestion) {
                NumberOfBagQuestion numberOfBagQuestion = (NumberOfBagQuestion) question;
                boolean ans = numberOfBagQuestion.ans(zMsgWebhook);
                sessionScript.pushOrReplace(question);
                if (ans)  askBill();
            }else if (question instanceof BillQuestion) {
                BillQuestion billQuestion = (BillQuestion) question;
                billQuestion.ans(zMsgWebhook);
                sessionScript.pushOrReplace(question);
            }
        return true;
    }


    private void askNumberOfBag() throws Exception {
        NumberOfBagQuestion numberOfBagQuestion = new NumberOfBagQuestion(promotionEntity.getRuleQuantily());
        ZMsg zMsg = numberOfBagQuestion.build2Ask();
        ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
        sessionScript.pushOrReplace(numberOfBagQuestion);
    }

    private void askBill() throws Exception {
        BillQuestion billQuestion = new BillQuestion();
        ZMsg zMsg = billQuestion.build2Ask();
        sessionScript.pushOrReplace(billQuestion);
        ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
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
        AddressQuestion addressQuestion = new AddressQuestion();
        ZMsg zMsg = addressQuestion.build2Ask();
        sessionScript.pushOrReplace(addressQuestion);
        ZaloService.INSTANCE.sendMsg(user.getFollowerZaloId(), zMsg);
        return true;
    }
}
