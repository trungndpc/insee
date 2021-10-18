package com.vn.insee.zalobot.registry;

import akka.actor.typed.Behavior;
import akka.actor.typed.javadsl.AbstractBehavior;
import akka.actor.typed.javadsl.ActorContext;
import akka.actor.typed.javadsl.Behaviors;
import akka.actor.typed.javadsl.Receive;
import com.vn.insee.zalobot.service.CustomerService;

public class ZaloWebhookRegistry extends AbstractBehavior<ZaloWebhookRegistry.Command> {

    public ZaloWebhookRegistry(ActorContext<Command> context) {
        super(context);
    }

    public static Behavior<Command> create() {
        return Behaviors.setup(ZaloWebhookRegistry::new);
    }

    @Override
    public Receive<Command> createReceive() {
        return newReceiveBuilder()
                .onMessage(ZaloSend.class, this::zaloSend)
                .build();
    }

    private Behavior<Command> zaloSend(ZaloSend msg) {
        CustomerService.INSTANCE.test();
        return Behaviors.same();
    }

    public static interface Command {
    }

    public static class UserSend implements Command{

    }

    public static class ZaloSend implements Command{

    }

    public static class Response implements Command {

    }
}
