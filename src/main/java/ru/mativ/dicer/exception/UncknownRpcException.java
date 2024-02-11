package ru.mativ.dicer.exception;

public class UncknownRpcException extends RpcException {

    private static final long serialVersionUID = -2901938550113029188L;

    public UncknownRpcException() {
        super("Uncknown error.");
    }

}
