package com.mycompany.myapp.domain;

import java.util.UUID;

public class MarketingTestSamples {

    public static Marketing getMarketingSample1() {
        return new Marketing().id("id1").campaign_name("campaign_name1").type("type1").status("status1");
    }

    public static Marketing getMarketingSample2() {
        return new Marketing().id("id2").campaign_name("campaign_name2").type("type2").status("status2");
    }

    public static Marketing getMarketingRandomSampleGenerator() {
        return new Marketing()
            .id(UUID.randomUUID().toString())
            .campaign_name(UUID.randomUUID().toString())
            .type(UUID.randomUUID().toString())
            .status(UUID.randomUUID().toString());
    }
}
