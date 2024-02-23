package com.example.demo.services;

import com.example.demo.controllers.DependentController;
import com.example.demo.data.DependentVO;
import com.example.demo.exceptions.RequiredObjectIsNullException;
import com.example.demo.model.Dependent;
import com.example.demo.repositories.DependentRepository;
import com.example.demo.repositories.ResponsibleRepository;
import com.example.demo.repositories.mapper.DozerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Service
public class DependentServices {

    private Logger logger = Logger.getLogger(DependentServices.class.getName());

    @Autowired
    DependentRepository repository;

    @Autowired
    ResponsibleRepository resRepository;

    @Autowired
    PagedResourcesAssembler<DependentVO> assembler;

    public PagedModel<EntityModel<DependentVO>> findAll(Pageable pageable) {
        logger.info("Finding all dependents!");

        var dependentPage = repository.findAll(pageable);
        var dependentVosPage = dependentPage.map(p -> DozerMapper.parseObject(p, DependentVO.class));
        dependentVosPage.map(p -> p.add(linkTo(methodOn(DependentController.class).findById(p.getKey())).withSelfRel()));

        Link link = linkTo(methodOn(DependentController.class).findAll(pageable.getPageNumber(), pageable.getPageSize(), "asc")).withSelfRel();
        return assembler.toModel(dependentVosPage, link);
    }

    public PagedModel<EntityModel<DependentVO>> findDependentsByName(String firstname, Pageable pageable) {
        logger.info("Finding all people by Name!");

        var dependentPage = repository.findDependentsByName(firstname, pageable);

        var dependentVosPage = dependentPage.map(p -> DozerMapper.parseObject(p, DependentVO.class));
        dependentVosPage.map(p -> p.add(linkTo(methodOn(DependentController.class).findById(p.getKey())).withSelfRel()));

        Link link = linkTo(methodOn(DependentController.class).findAll(pageable.getPageNumber(), pageable.getPageSize(), "asc")).withSelfRel();
        return assembler.toModel(dependentVosPage, link);
    }

    public PagedModel<EntityModel<DependentVO>> findDependentsByCpfRes(String cpfRes, Pageable pageable) {

        logger.info("Finding all people by CpfRes!");

        var dependentPage = repository.findDependentsByCpfRes(cpfRes, pageable);

        var dependentVosPage = dependentPage.map(p -> DozerMapper.parseObject(p, DependentVO.class));
        dependentVosPage.map(p -> p.add(linkTo(methodOn(DependentController.class).findById(p.getKey())).withSelfRel()));

        Link link = linkTo(methodOn(DependentController.class).findAll(pageable.getPageNumber(), pageable.getPageSize(), "asc")).withSelfRel();
        return assembler.toModel(dependentVosPage, link);
    }

    public DependentVO findById(String id) {

        logger.info("Finding a dependent!");

        var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));

        var vo = DozerMapper.parseObject(entity, DependentVO.class);

        vo.add(linkTo(methodOn(DependentController.class).findById(id)).withSelfRel());

        return vo;
    }

    public Map<String, String> verifyDependentsCpfAndEmergPhone(String cpfDep, String emergPhone) {

        logger.info("Verifying Dependents CPF and Emergency Phone!");

        String emergePhoneByCpf = resRepository.findResponsibleEmergPhoneByCpfDep(cpfDep);
        String emergePhoneByPath = emergPhone;
        if (emergePhoneByCpf.equals(emergePhoneByPath)) {
            Map<String, String> data = new HashMap<>();

            data.put("emergPhone", emergPhone);
            data.put("cpfDep", cpfDep);

            return data;
        } else {
            throw new RuntimeException("The emergency phones " + emergePhoneByCpf + " and " + emergePhoneByPath + " aren't the same.");
        }
    }

    public DependentVO create(DependentVO dependent) {
        if (dependent == null) throw new RequiredObjectIsNullException();

        logger.info("Creating a dependent!");

        var entity = DozerMapper.parseObject(dependent, Dependent.class);

        var vo = DozerMapper.parseObject(repository.save(entity), DependentVO.class);

        vo.add(linkTo(methodOn(DependentController.class).findById(vo.getKey())).withSelfRel());

        return vo;
    }

    public DependentVO update(DependentVO dependent) {
        if (dependent == null) throw new RequiredObjectIsNullException();

        logger.info("Updating a dependent!");

        var entity = repository.findById(dependent.getKey()).orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));

        entity.setNomeDep(dependent.getNomeDep());
        entity.setIdadeDep(dependent.getIdadeDep());
        entity.setTipoSanguineo(dependent.getTipoSanguineo());
        entity.setLaudo(dependent.getLaudo());
        entity.setGeneroDep(dependent.getGeneroDep());
        entity.setRgDep(dependent.getRgDep());
        entity.setCpfResDep(dependent.getCpfResDep());
        entity.setPiTagIdDep(dependent.getPiTagIdDep());
        entity.setCpfTerDep(dependent.getCpfTerDep());
        entity.setIdCirurgiaDep(dependent.getIdCirurgiaDep());
        entity.setIdScanDep(dependent.getIdScanDep());

        var vo = DozerMapper.parseObject(repository.save(entity), DependentVO.class);

        vo.add(linkTo(methodOn(DependentController.class).findById(vo.getKey())).withSelfRel());

        return vo;
    }

    public void delete(String id) {
        logger.info("Deleting a Dependent!");

        var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));

        repository.delete(entity);
    }
}
