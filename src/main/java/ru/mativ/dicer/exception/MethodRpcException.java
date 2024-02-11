package ru.mativ.dicer.exception;

public class MethodRpcException extends RpcException {
    private static final long serialVersionUID = -3995125202064420113L;

    public MethodRpcException() {
        super("Method is not allowed.");
    }

}
