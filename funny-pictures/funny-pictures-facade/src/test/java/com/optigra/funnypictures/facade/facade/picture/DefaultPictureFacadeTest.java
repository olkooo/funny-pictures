package com.optigra.funnypictures.facade.facade.picture;

import static org.junit.Assert.assertEquals;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyListOf;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import com.optigra.funnypictures.facade.converter.Converter;
import com.optigra.funnypictures.facade.resources.ApiResource;
import com.optigra.funnypictures.facade.resources.picture.PictureResource;
import com.optigra.funnypictures.facade.resources.search.PagedRequest;
import com.optigra.funnypictures.facade.resources.search.PagedResultResource;
import com.optigra.funnypictures.model.Picture;
import com.optigra.funnypictures.pagination.PagedResult;
import com.optigra.funnypictures.pagination.PagedSearch;
import com.optigra.funnypictures.service.picture.PictureService;

@RunWith(MockitoJUnitRunner.class)
public class DefaultPictureFacadeTest {

	@InjectMocks
	private DefaultPictureFacade unit;

	@Mock
	private Converter<PagedRequest, PagedSearch<Picture>> pagedRequestConverter;

	@Mock
	private Converter<PagedResult<?>, PagedResultResource<? extends ApiResource>> pagedResultConverter;

	@Mock
	private Converter<Picture, PictureResource> pictureConverter;
	
	@Mock
	private PictureService pictureService;
	
	@Test
	public void testGetPictures() throws Exception {
		// Given
		Long offset = 1L;
		Integer limit = 20;
		PagedRequest pagedRequest = new PagedRequest(offset, limit);
		PagedSearch<Picture> pagedSearch = new PagedSearch<>();
		pagedSearch.setLimit(limit);
		pagedSearch.setOffset(offset);

		Picture picture1 = new Picture();
		picture1.setName("picture1");
		long count = 199;
		List<Picture> entities = Arrays.asList(picture1);
		PagedResult<Picture> pagedResult = new PagedResult<Picture>(offset, limit, count , entities);
		PictureResource resource1 = new PictureResource();
		List<PictureResource> resources = Arrays.asList(resource1);
		
		PagedResultResource<PictureResource> expected = new PagedResultResource<>("/pictures");
		expected.setEntities(resources);
		
		// When
		when(pagedRequestConverter.convert(any(PagedRequest.class))).thenReturn(pagedSearch);
		when(pictureService.getPictures(Matchers.<PagedSearch<Picture>>any())).thenReturn(pagedResult);
		when(pictureConverter.convertAll(anyListOf(Picture.class))).thenReturn(resources);
		
		PagedResultResource<PictureResource> actual = unit.getPictures(pagedRequest);

		// Then
		verify(pagedRequestConverter).convert(pagedRequest);
		verify(pictureService).getPictures(pagedSearch);
		verify(pictureConverter).convertAll(entities);
		verify(pagedResultConverter).convert(pagedResult, expected);
		
		assertEquals(expected, actual);
	}
}
