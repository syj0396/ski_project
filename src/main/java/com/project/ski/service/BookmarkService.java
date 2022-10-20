package com.project.ski.service;

import com.project.ski.repository.BookmarkRepository;
import com.project.ski.web.dto.BookmarkDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final EntityManager entityManager;

    @Transactional(readOnly = true)
    public List<BookmarkDto> getBookmarkList(long principalId, long toResortId) {
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT u.id, u.username, u.resortName, ");
        sb.append("if ((SELECT 1 FROM bookmark WHERE fromUserId = ? AND toResortId = u.id");
        return null;
    }

    @Transactional
    public void onBookmark(long fromUserId, long toResortId) {
        bookmarkRepository.customOnBookmark(fromUserId, toResortId);
    }

    @Transactional
    public void offBookmark(long fromUserId, long toResortId) {
        bookmarkRepository.customOffBookmark(fromUserId, toResortId);
    }

}
