package com.easyrsvpgroup.easyrsvp.dto;

import com.easyrsvpgroup.easyrsvp.model.Invite;
import com.easyrsvpgroup.easyrsvp.model.Response;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class OutgoingResponseDTO {
    private Response response;
    private Invite invite;
}
