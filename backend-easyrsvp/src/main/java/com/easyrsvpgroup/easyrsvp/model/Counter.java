package com.easyrsvpgroup.easyrsvp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;

@Entity
@NoArgsConstructor
@Table(name = "counter")
public class Counter {
    @Id
    @Getter
    private int counterId;
    @Getter
    @Setter
    private String counterName;
    @Getter
    @Setter
    private BigInteger counterCount;
}
