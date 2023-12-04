package com.easyrsvpgroup.easyrsvp.service;

import com.easyrsvpgroup.easyrsvp.model.Response;

public interface ResponseService {
    public Response saveResponse(Response response);
    public Response findByGuestCode(String guestUniqueCode);
    public void deleteResponse(Response response);
    public Response updateResponse(Response response);
}
