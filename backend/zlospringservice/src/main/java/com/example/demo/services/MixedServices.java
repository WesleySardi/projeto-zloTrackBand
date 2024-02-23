package com.example.demo.services;

import com.example.demo.controllers.DependentController;
import com.example.demo.data.DependentVO;
import com.example.demo.data.DependentWebDataVO;
import com.example.demo.repositories.DependentRepository;
import com.example.demo.repositories.ResponsibleRepository;
import com.example.demo.repositories.mapper.DozerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Service
public class MixedServices {

    private Logger logger = Logger.getLogger(DependentServices.class.getName());

    @Autowired
    DependentRepository depRepository;

    @Autowired
    ResponsibleRepository resRepository;

    @Autowired
    PagedResourcesAssembler<DependentVO> assembler;

    public DependentVO findByIdWithSecurity(String cpfDep, String emergePhone) {
        Integer emergePhoneByCpf = Integer.valueOf(resRepository.findResponsibleEmergPhoneByCpfDep(cpfDep));
        Integer emergePhoneByPath = Integer.valueOf(emergePhone);
        if (emergePhoneByCpf.equals(emergePhoneByPath)) {
            logger.info("Finding a dependent!");

            var entity = depRepository.findById(cpfDep).orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));

            var vo = DozerMapper.parseObject(entity, DependentVO.class);

            vo.add(linkTo(methodOn(DependentController.class).findById(cpfDep)).withSelfRel());

            return vo;
        } else {
            throw new RuntimeException("The emergency phones " + emergePhoneByCpf + " and " + emergePhoneByPath + " aren't the same.");
        }
    }

    public DependentWebDataVO findWebDataByIdWithSecurity(String cpfDep, String emergePhone) {
        String emergePhoneByCpf = resRepository.findResponsibleEmergPhoneByCpfDep(cpfDep);
        String emergePhoneByPath = emergePhone;
        if (emergePhoneByCpf.equals(emergePhoneByPath)) {
            logger.info("Finding a dependent!");

            var entity = depRepository.findById(cpfDep).orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));

            var vo = DozerMapper.parseObject(entity, DependentWebDataVO.class);

            vo.add(linkTo(methodOn(DependentController.class).findById(cpfDep)).withSelfRel());

            return vo;
        } else {
            throw new RuntimeException("The emergency phones " + emergePhoneByCpf + " and " + emergePhoneByPath + " aren't the same.");
        }
    }
}
