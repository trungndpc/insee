package com.vn.insee.zalobot.worker.script.upload_bill;

import com.vn.insee.zalobot.worker.script.Question;
import com.vn.insee.zalobot.worker.script.upload_bill.documnet.FormDocument;
import com.vn.insee.zalobot.worker.script.upload_bill.question.*;

import java.util.*;

public class SessionUploadBillScript {
    private Map<Class, Question> questions;

    public SessionUploadBillScript() {
        questions = new HashMap<>();
    }

    public Optional<Question> getWaitingQuestion() {
        return questions.values().stream()
                .filter(q -> q.status == Question.ASKED_STATUS)
                .findFirst();
    }

    public void pushOrReplace(Question question) {
        questions.put(question.getClass(), question);
    }

    public Question getQuestion(Class zClass) {
        return questions.get(zClass);
    }

    public boolean isCompleted() {
        if (questions == null || questions.isEmpty()) {
            return false;
        }
        return questions.values().stream()
                .anyMatch(p -> p.status != Question.COMPLETED_STATUS);
    }

    public FormDocument collect() {
        FormDocument formDocument = new FormDocument();
        for (Question question:  questions.values()) {
            if (question instanceof AddressQuestion) {
                AddressQuestion addressQuestion = (AddressQuestion) question;
                formDocument.setCityId(addressQuestion.getCityId());
                formDocument.setDistrictId(addressQuestion.getDistrictId());
                formDocument.setAddress(addressQuestion.getAddress());
            }

            if (question instanceof CementQuestion) {
                CementQuestion cementQuestion = (CementQuestion) question;
                formDocument.setCementId(cementQuestion.getSelectedCement());
            }

            if (question instanceof NumberOfBagQuestion) {
                NumberOfBagQuestion numberOfBagQuestion = (NumberOfBagQuestion) question;
                formDocument.setBags(numberOfBagQuestion.getBags());
            }

            if (question instanceof PhoneRetailerQuestion) {
                PhoneRetailerQuestion phoneRetailerQuestion = (PhoneRetailerQuestion) question;
                formDocument.setPhone(phoneRetailerQuestion.getPhone());
                formDocument.setStoreName(phoneRetailerQuestion.getStore());
            }

            if (question instanceof BillQuestion) {
                BillQuestion billQuestion = (BillQuestion) question;
                List<String> urls = billQuestion.getUrls();
                formDocument.setUrls(urls);
            }
        }
        return formDocument;
    }
}
