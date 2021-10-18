package com.vn.insee.zalobot.worker.script.loyalty;

import com.vn.insee.zalobot.worker.script.Question;
import com.vn.insee.zalobot.worker.script.loyalty.document.FormLoyaltyDocument;
import com.vn.insee.zalobot.worker.script.loyalty.question.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class SessionLoyaltyScript {
    private Map<Class, Question> questions;

    public SessionLoyaltyScript() {
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

    public FormLoyaltyDocument collect() {
        FormLoyaltyDocument formLoyaltyDocument = new FormLoyaltyDocument();
        for (Question question: questions.values()) {
            if (question instanceof AddressLoyaltyQuestion) {
                formLoyaltyDocument.setAddress(((AddressLoyaltyQuestion) question).getAddress());
            }
            if (question instanceof ImageLoyaltyQuestion) {
                formLoyaltyDocument.setImages(((ImageLoyaltyQuestion) question).getUrls());
            }
            if (question instanceof BillLoyaltyQuestion) {
                formLoyaltyDocument.setBills(((BillLoyaltyQuestion) question).getUrls());
            }
            if (question instanceof CementLoyaltyQuestion) {
                formLoyaltyDocument.setCementId(((CementLoyaltyQuestion) question).getSelectedCement());
            }
            if (question instanceof IsMixCementLoyaltyQuestion) {
                formLoyaltyDocument.setMixCement(((IsMixCementLoyaltyQuestion) question).getMixCement());
            }
            if (question instanceof NumberFloorLoyaltyQuestion) {
                formLoyaltyDocument.setFloor(((NumberFloorLoyaltyQuestion) question).getFloor());
            }
            if (question instanceof  NumberOfBagLoyaltyQuestion) {
                formLoyaltyDocument.setBags(((NumberOfBagLoyaltyQuestion) question).getBags());
            }
            if (question instanceof SquareLoyaltyQuestion) {
                formLoyaltyDocument.setSquare(((SquareLoyaltyQuestion) question).getSquare());
            }
        }
        return formLoyaltyDocument;
    }

}
