package com.vn.insee.zalobot.routes;

import akka.actor.typed.ActorRef;
import akka.actor.typed.Scheduler;
import akka.actor.typed.javadsl.ActorContext;
import akka.actor.typed.javadsl.AskPattern;
import akka.http.javadsl.model.StatusCodes;
import akka.http.javadsl.server.Route;
import com.vn.insee.zalobot.registry.ZaloWebhookRegistry;

import static akka.http.javadsl.server.Directives.*;
import java.time.Duration;
import java.util.concurrent.CompletionStage;

public class ZaloWebhookRoute {
    private final ActorRef<ZaloWebhookRegistry.Command> registry;
    private final Duration askTimeout;
    private final Scheduler scheduler;

    public ZaloWebhookRoute(ActorContext context) {
        scheduler = context.getSystem().scheduler();
        askTimeout = Duration.ofSeconds(5);
        this.registry = context.spawn(ZaloWebhookRegistry.create(), "zalo-webhook-registry");
    }

    public Route userRoutes() {
        return get(() -> {
            return zaloSend();
        });
    }

    public Route zaloSend() {
        return onSuccess(askRegistryZaloSend(), response ->  {
            return complete(StatusCodes.OK);
        });
    }

    private CompletionStage<ZaloWebhookRegistry.Response> askRegistryZaloSend() {
        return AskPattern.ask(this.registry, replyTo -> new ZaloWebhookRegistry.ZaloSend(), this.askTimeout, this.scheduler);
    }
}
