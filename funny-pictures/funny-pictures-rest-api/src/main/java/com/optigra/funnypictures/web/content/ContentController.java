package com.optigra.funnypictures.web.content;

import java.io.InputStream;
import java.io.OutputStream;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.optigra.funnypictures.facade.facade.content.ContentFacade;
import com.optigra.funnypictures.facade.resources.content.ContentResource;
import com.optigra.funnypictures.web.BaseController;

@Controller
public class ContentController extends BaseController {

    @Resource(name = "contentFacade")
    private ContentFacade contentFacade;
    
    @RequestMapping(value = "/content", method = RequestMethod.GET)
    public void getContentByPath(final HttpServletResponse response, @RequestParam("contentPath") final String contentPath) throws Exception {
        ContentResource contentResource = contentFacade.getContent(contentPath);
        
        InputStream in = contentResource.getContentStream();
        OutputStream out = response.getOutputStream();
        
        response.setHeader(HttpHeaders.CONTENT_TYPE, contentResource.getMimeType().getType());
                
        IOUtils.copy(in, out);
        IOUtils.closeQuietly(in);
    }
}
