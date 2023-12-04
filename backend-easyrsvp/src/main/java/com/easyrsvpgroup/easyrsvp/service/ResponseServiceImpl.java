package com.easyrsvpgroup.easyrsvp.service;

import com.easyrsvpgroup.easyrsvp.model.Response;
import com.easyrsvpgroup.easyrsvp.repository.ResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ResponseServiceImpl implements ResponseService{

    @Autowired
    private ResponseRepository responseRepository;

    @Override
    public Response saveResponse(Response response) {
        return responseRepository.save(response);
    }

    @Override
    public Response findByGuestCode(String guestUniqueCode) {
        return responseRepository.findResponseByGuestUniqueCode(guestUniqueCode);
    }

    @Override
    public void deleteResponse(Response response) {
        responseRepository.delete(response);
    }

    @Override
    public Response updateResponse(Response response) {
        Response r = findByGuestCode(response.getGuestCode());
        r.setGuestName(response.getGuestName());
        r.setGuestMobile(response.getGuestMobile());
        r.setGuestDecision(response.getGuestDecision());
        r.setGuestNotes(response.getGuestNotes());
        r.setLastModified(new Date());

        return responseRepository.save(r);
    }
}
