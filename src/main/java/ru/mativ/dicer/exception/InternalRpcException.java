package ru.mativ.dicer.exception;

public class InternalRpcException extends DicerException {
    private static final long serialVersionUID = -2983909034788009853L;

    public InternalRpcException() {
        super("Internal server error");
    }

}
