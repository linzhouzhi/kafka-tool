package com.lzz.model;

/**
 * Created by gl49 on 2018/1/10.
 */
public class Response {
    private int errorCode = 0;
    private String msg;
    private Object result;

    public Response(){
        //ignore
    }

    public Response(int errorCode, String msg){
        this.errorCode = errorCode;
        this.msg = msg;
    }

    public Response(int errorCode, String msg, Object result){
        this.errorCode = errorCode;
        this.msg = msg;
        this.result = result;
    }

    public static Response success(){
        return success("success");
    }
    public static Response success(String msg){
        return new Response(0, msg);
    }
    public static Response fail(){
        return fail("fail");
    }
    public static Response fail(String msg){
        return new Response(1, msg);
    }
    public static Response common(boolean res){
        return res ? Response.success() : Response.fail();
    }
    public static Response res(Object result){
        return new Response(0, "success", result);
    }

    public int getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getResult() {
        return result;
    }

    public void setResult(Object result) {
        this.result = result;
    }


}
