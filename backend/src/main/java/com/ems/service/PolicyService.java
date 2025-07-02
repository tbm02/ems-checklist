package com.ems.service;

import com.ems.entity.Policy;
import com.ems.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PolicyService {
    
    @Autowired
    private PolicyRepository policyRepository;
    
    public List<Policy> getActivePolicies() {
        return policyRepository.findByActiveOrderByCreatedAtDesc(true);
    }
    
    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }
    
    public Policy createPolicy(Policy policy) {
        return policyRepository.save(policy);
    }
    
    public Policy updatePolicy(Long policyId, Policy policyUpdate) {
        Policy policy = policyRepository.findById(policyId)
                .orElseThrow(() -> new RuntimeException("Policy not found"));
        
        // Update fields
        if (policyUpdate.getTitle() != null) {
            policy.setTitle(policyUpdate.getTitle());
        }
        if (policyUpdate.getDescription() != null) {
            policy.setDescription(policyUpdate.getDescription());
        }
        if (policyUpdate.getEffectiveDate() != null) {
            policy.setEffectiveDate(policyUpdate.getEffectiveDate());
        }
        
        return policyRepository.save(policy);
    }
    
    public void deletePolicy(Long policyId) {
        Policy policy = policyRepository.findById(policyId)
                .orElseThrow(() -> new RuntimeException("Policy not found"));
        
        policy.setActive(false);
        policyRepository.save(policy);
    }
} 