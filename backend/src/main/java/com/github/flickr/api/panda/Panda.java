package com.github.flickr.api.panda;

public enum Panda {
    LING_LING("ling ling"),
    HSING_HSING("hsing hsing"),
    WANG_WANG("wang wang");

    private final String pandaName;

    Panda(final String pandaName) {
        this.pandaName = pandaName;
    }

    public String getPandaName() {
        return pandaName;
    }

    public static Panda fromValue(final String name) {
        for (Panda panda : values()) {
            if (panda.getPandaName().equals(name)) {
                return panda;
            }
        }
        throw new IllegalArgumentException("Invalid panda name : " + name);
    }
}
