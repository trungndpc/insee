package com.vn.insee.zalobot.worker.script.find_promotion;

import com.vn.insee.zalobot.worker.script.Question;

import java.util.*;

public class SessionFindPromotionScript {
    private Map<Class, Question> questions;

    public SessionFindPromotionScript() {
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
}
