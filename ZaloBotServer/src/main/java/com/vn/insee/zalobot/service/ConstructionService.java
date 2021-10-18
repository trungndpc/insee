package com.vn.insee.zalobot.service;

import com.vn.insee.zalobot.entity.ConstructionEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConstructionService {
    public static ConstructionService INSTANCE;

    public ConstructionService() {
        INSTANCE = this;
    }

    public List<ConstructionEntity> findConstruction(int promotionId, int userId) {
        //Todo
        return null;
    }
}
