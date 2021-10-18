package com.vn.insee.zalobot.common.insee;

import vn.com.insee.corporate.dto.response.utities.ProductDTO;
import vn.com.insee.corporate.exception.InternalException;

import java.util.List;
import java.util.stream.Collectors;

public class INSEEUtil {

    public static INSEEMessage getMessageFromBuyingINSEECement(int productId, int bag) throws InternalException {
        int weigh = weigh(bag, productId);
        double saving = reduceEmissions(productId, weigh / 1000);
        int numOfTree = numberOfTree(saving);
        return new INSEEMessage(numOfTree, saving, productId, bag);
    }

    public static INSEEMessage getMessageFromBuyingINSEECementTon(int productId, double weigh) throws InternalException {
        double saving = reduceEmissions(productId, weigh);
        int numOfTree = numberOfTree(saving);
        return new INSEEMessage(numOfTree, saving, productId, bags(weigh * 1000, productId));
    }

    public static List<ProductDTO> getListProducts() {
        List<Product> list = CementManager.getList();
        return list.stream().map(e ->  new ProductDTO(e.getName(), e.getId(), e.getSegment().getValue(), 1)).collect(Collectors.toList());
    }

    public static int numberOfTree(double savingVolume) {
        return (int) (savingVolume / CementManager.EVERY_TREE_HELP_TO_REDUCE_CO2);
    }

    public static double reduceEmissions(int productId, double ton) throws InternalException {
        Product product = CementManager.findById(productId);
        if (product == null) {
            throw new InternalException("product doesn't exist | productId: " + productId);
        }
        return reduceEmissions(product, ton);
    }

    public static double reduceEmissions(Product product, double ton) {
        int saving = product.getCommonVolumeExhaust() - product.getInseeVolumeExhaust();
        return ton * saving;
    }

    public static int weigh(int bag, int productId) throws InternalException {
        Product product = CementManager.findById(productId);
        if (bag < 0) {
            throw new InternalException("bag is invalid | productId: " + productId);
        }
        if (product == null) {
            throw new InternalException("product doesn't exist | productId: " + productId);
        }
        return product.getVolumeOneBag() * bag;
    }

    public static int bags(double weigh, int productId) throws InternalException {
        Product product = CementManager.findById(productId);
        if (weigh < 0) {
            throw new InternalException("weigh is invalid | productId: " + productId);
        }
        if (product == null) {
            throw new InternalException("product doesn't exist | productId: " + productId);
        }
        return (int) (weigh / product.getVolumeOneBag());
    }


}
