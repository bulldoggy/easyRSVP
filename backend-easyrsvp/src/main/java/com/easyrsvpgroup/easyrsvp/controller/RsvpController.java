package com.easyrsvpgroup.easyrsvp.controller;

import com.easyrsvpgroup.easyrsvp.dto.InviteCreateDTO;
import com.easyrsvpgroup.easyrsvp.dto.ResponseCreateDTO;
import com.easyrsvpgroup.easyrsvp.model.Invite;
import com.easyrsvpgroup.easyrsvp.model.Response;
import com.easyrsvpgroup.easyrsvp.service.InviteService;
import com.easyrsvpgroup.easyrsvp.service.ResponseService;
import com.easyrsvpgroup.easyrsvp.util.RandomStringGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/rsvp")
@CrossOrigin
public class RsvpController {
    @Autowired
    private InviteService inviteService;
    @Autowired
    private ResponseService responseService;

    final static String inviteCode = "i";
    final static String responseCode = "r";
    final static String guestCode = "g";

    @PostMapping("/createInvite")
    public Invite createInvite(@RequestBody InviteCreateDTO inviteCreateDTO) {
        Invite i = new Invite();
        i.setOwnerName(inviteCreateDTO.getOwnerName());
        i.setEventDetails(inviteCreateDTO.getEventDetails());
        i.setEventAddress(inviteCreateDTO.getEventAddress());
        i.setEventDate(inviteCreateDTO.getEventDate());
        i.setInviteCode(inviteCode + RandomStringGenerator.generate());
        i.setResponseCode(responseCode + RandomStringGenerator.generate());
        i.setCreatedAt(new Date());
        i.setTimezone(inviteCreateDTO.getTimezone());
        i.setResponses(new ArrayList<>());
        return inviteService.saveInvite(i);
    }

    @PutMapping("/editInvite")
    public Invite editInvite(@RequestBody Invite invite) {
        Invite i = inviteService.findByInviteCode(invite.getInviteCode());
        i.setOwnerName(invite.getOwnerName());
        i.setEventDetails(invite.getEventDetails());
        i.setEventAddress(invite.getEventAddress());
        i.setEventDate(invite.getEventDate());
        i.setTimezone(invite.getTimezone());
        return inviteService.updateInvite(i);
    }

    @DeleteMapping("/deleteInvite")
    public void deleteInvite(@RequestParam("code") String inviteCode) {
        Invite i = inviteService.findByInviteCode(inviteCode);
        inviteService.deleteInvite(i);
    }

    @GetMapping("/host")
    public Invite host(@RequestParam("code") String inviteCode) {
        return inviteService.findByInviteCode(inviteCode);
    }

    @GetMapping("/response")
    public Invite response(@RequestParam("code") String responseCode) {
        return inviteService.findByResponseCode(responseCode);
    }

    @PostMapping("/createResponse")
    public Response createResponse(@RequestBody ResponseCreateDTO responseCreateDTO) {
        Invite i = inviteService.findByInviteCode(responseCreateDTO.getInviteCode());

        Response r = new Response();
        r.setGuestName(responseCreateDTO.getGuestName());
        r.setGuestMobile(responseCreateDTO.getGuestMobile());
        r.setGuestDecision(responseCreateDTO.getGuestDecision());
        r.setGuestNotes(responseCreateDTO.getGuestNotes());
        r.setInvite(i);
        r.setGuestCode(guestCode + RandomStringGenerator.generate());
        r.setLastModified(new Date());

        return responseService.saveResponse(r);
    }

    @DeleteMapping("/deleteResponse")
    public void deleteResponse(@RequestParam("code") String guestCode) {
        Response r = responseService.findByGuestCode(guestCode);

        Invite i = r.getInvite();
        i.getResponses().remove(r);

        responseService.deleteResponse(r);
        inviteService.updateInvite(i);
    }

    @GetMapping("/guest")
    public Response guest(@RequestParam("code") String guestCode) {
        return responseService.findByGuestCode(guestCode);
    }

    @PutMapping("/editResponse")
    public Response editInvite(@RequestBody Response response) {
        Response r = responseService.findByGuestCode(response.getGuestCode());
        r.setGuestName(response.getGuestName());
        r.setGuestMobile(response.getGuestMobile());
        r.setGuestDecision(response.getGuestDecision());
        r.setGuestNotes(response.getGuestNotes());
        r.setLastModified(response.getLastModified());

        return responseService.updateResponse(r);
    }

    @GetMapping("/allInvites")
    public List<Invite> allInvites() {
        return inviteService.getAllInvites();
    }
}
