package com.vn.insee.zalobot.service;

import com.vn.insee.zalobot.entity.PromotionEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PromotionService {
    public static PromotionService INSTANCE;

    public PromotionService() {
        INSTANCE = this;
    }

    public List<PromotionEntity> find(int userId) {
        return new ArrayList<>();
    }
}
