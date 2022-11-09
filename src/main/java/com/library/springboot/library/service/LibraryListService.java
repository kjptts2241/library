package com.library.springboot.library.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.transaction.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.library.springboot.library.dao.repository.TbLibraryListRepository;
import com.library.springboot.library.dto.LibraryListDto;

@RequiredArgsConstructor
@Service
public class LibraryListService {
    
    private final TbLibraryListRepository tbLibraryListRepository;

    @Transactional
    public void LibraryListSearch() throws IOException { // 도서관 데이터를 dto에 저장 하기 위한 함수

        ObjectMapper mapper = new ObjectMapper(); // list를 dto에 mapping 해주기 위한 mapper 생성
                                                  // Mapping 파일에 기재된 SQL을 호출하기 위한 인터페이스
        String list = new Gson().toJson(tbLibraryListRepository.findAll()); // 도서관 데이터를 list 변수에 저장

        List<LibraryListDto> dtos = Arrays.asList(mapper.readValue(list, LibraryListDto[].class)); // list를 dto에 List형식으로 dtos에 mapping
        System.out.println(dtos);
    }
}
