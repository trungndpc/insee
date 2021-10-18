package com.vn.insee.zalobot.worker.script.loyalty;

import com.vn.insee.zalobot.entity.ConstructionEntity;
import com.vn.insee.zalobot.entity.PromotionEntity;
import com.vn.insee.zalobot.worker.script.find_promotion.document.PromotionDocument;
import com.vn.insee.zalobot.worker.script.loyalty.document.ConstructionLoyaltyDocument;

import java.util.List;
import java.util.stream.Collectors;

public class ConvertEntity2LoyaltyDocumentScript {

    public static ConstructionLoyaltyDocument convert2Document(ConstructionEntity constructionEntity) {
        ConstructionLoyaltyDocument constructionLoyalty = new ConstructionLoyaltyDocument();
        constructionLoyalty.setId(constructionEntity.getId());
        constructionLoyalty.setAddress(constructionEntity.getAddress());
        constructionLoyalty.setFloors(constructionEntity.getFloors());
        constructionLoyalty.setSquare(constructionEntity.getSquare());
        constructionLoyalty.setMixCement(constructionEntity.getMixCement());
        return constructionLoyalty;
    }

    public static List<ConstructionLoyaltyDocument> convert2Documents(List<ConstructionEntity> constructionEntities) {
        if (constructionEntities == null || constructionEntities.isEmpty()) {
            return null;
        }
        return constructionEntities.stream().map(p -> convert2Document(p))
                .collect(Collectors.toList());
    }

}
