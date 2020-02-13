import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Nationalities } from '../types/api-output';
import { HttpRequestService } from './http-request.service';
import { NationalitiesService } from './nationalities.service';
import DoneCallback = jest.DoneCallback;

describe('NationalitiesService', () => {
  let spyHttpRequestService: any;
  let service: NationalitiesService;

  beforeEach(() => {
    spyHttpRequestService = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        { provide: HttpRequestService, useValue: spyHttpRequestService },
      ],
    });
    service = TestBed.get(NationalitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should execute GET', () => {
    service.getNationalities();
    expect(spyHttpRequestService.get).toHaveBeenCalledWith('/nationalities');
  });

  it('should return nationalities', (done: DoneCallback) => {
    const mockNationalities: Nationalities = {
      nationalities: ['Singapore'],
    };
    spyHttpRequestService.get.mockReturnValue(of<Nationalities>(mockNationalities));
    service.getNationalities().subscribe((nationalities: Nationalities) => {
      expect(nationalities).toEqual(mockNationalities);
      done();
    });
  });
});
