package com.vn.insee.zalobot.worker.script.find_promotion;

import com.vn.insee.zalobot.entity.PromotionEntity;
import com.vn.insee.zalobot.worker.script.find_promotion.document.PromotionDocument;

import java.util.List;
import java.util.stream.Collectors;

public class ConvertEntity2DocumentScript {

    public static PromotionDocument convert2Document(PromotionEntity promotionEntity) {
        PromotionDocument promotionDocument = new PromotionDocument();
        promotionDocument.setId(promotionDocument.getId());
        promotionDocument.setSummary(promotionDocument.getSummary());
        promotionDocument.setTitle(promotionDocument.getTitle());
        promotionDocument.setType(promotionDocument.getType());
        return promotionDocument;
    }

    public static List<PromotionDocument> convert2Documents(List<PromotionEntity> promotionEntities) {
        if (promotionEntities == null || promotionEntities.isEmpty()) {
            return null;
        }
        return promotionEntities.stream().map(p -> convert2Document(p))
                .collect(Collectors.toList());
    }

}
