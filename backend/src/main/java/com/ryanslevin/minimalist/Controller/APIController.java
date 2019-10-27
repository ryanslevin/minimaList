package com.ryanslevin.minimalist.Controller;

import com.ryanslevin.minimalist.Entity.Message;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/api", produces=MediaType.APPLICATION_JSON_VALUE)
public class APIController {

    @GetMapping(value="/public")
    public Message publicEndpoint() {
        return new Message("All good. You do not need to be authenticated to call /api/public");
    }

    @GetMapping(value="/private")
    public Message privateEndpoint() {
        return new Message("All good. You do not need to be authenticated to call /api/public");
    }

    @GetMapping(value="/private-scoped")
    public Message privateScopedEndpoint() {
        return new Message("All good. You do not need to be authenticated to call /api/public");
    }

}