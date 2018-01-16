package com.lzz.controller;

import com.lzz.logic.ToolService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * Created by lzz on 2018/1/14.
 */
@Controller
public class ToolController {
    @Resource
    ToolService toolService;

    @RequestMapping("/tool")
    public String tool(Model model) {
        return "tool";
    }

    @RequestMapping( value = "/start-consumer", method = RequestMethod.POST)
    @ResponseBody
    public String startConsumer(@RequestBody JSONObject requestBody) {
        toolService.startConsumer(requestBody);
        return "hello " + requestBody;
    }

    @RequestMapping( value = "/stop-consumer", method = RequestMethod.POST)
    @ResponseBody
    public String stopConsumer(@RequestBody JSONObject requestBody) {
        return "hello " + requestBody;
    }

    @RequestMapping( value = "/create-topic", method = RequestMethod.POST)
    @ResponseBody
    public String createTopic(@RequestBody JSONObject requestBody) {
        toolService.createTopic(requestBody);
        return "success";
    }

    @RequestMapping("/test")
    @ResponseBody
    public String tool(@RequestParam(value="name", defaultValue="World") String name) {
        return "hello " + name;
    }
}