package com.t2t.controller;

import com.t2t.model.Reward;
import com.t2t.repository.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rewards")
@CrossOrigin(origins = "*")
public class RewardController {

    @Autowired
    private RewardRepository rewardRepository;

    @GetMapping
    public List<Reward> getAllRewards() {
        return rewardRepository.findAll();
    }

    @PostMapping
    public Reward createReward(@RequestBody Reward reward) {
        return rewardRepository.save(reward);
    }
}
