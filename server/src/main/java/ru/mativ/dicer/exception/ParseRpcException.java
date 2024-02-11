package ru.mativ.dicer.exception;

public class ParseRpcException extends RpcException {
    private static final long serialVersionUID = 1050304002418225171L;

    public ParseRpcException() {
        super("Parse error.");
    }

}
