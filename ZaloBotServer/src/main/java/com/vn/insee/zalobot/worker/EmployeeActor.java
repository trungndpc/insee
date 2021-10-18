package com.vn.insee.zalobot.worker;

import akka.actor.typed.javadsl.AbstractBehavior;
import akka.actor.typed.javadsl.ActorContext;
import akka.actor.typed.javadsl.Receive;

public class EmployeeActor extends AbstractBehavior<EmployeeActor.Command> {
    private final String id;
    private String userId;

    public EmployeeActor(ActorContext<Command> context, String id) {
        super(context);
        this.id = id;
    }

    @Override
    public Receive<Command> createReceive() {
        return null;
    }

    public static interface Command {}

    public String getId() {
        return id;
    }
}
