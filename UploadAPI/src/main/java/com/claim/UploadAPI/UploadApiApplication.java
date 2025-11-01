package com.claim.UploadAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = {
        com.azure.spring.cloud.autoconfigure.implementation.storage.fileshare.AzureStorageFileShareAutoConfiguration.class,
        com.azure.spring.cloud.autoconfigure.implementation.storage.queue.AzureStorageQueueAutoConfiguration.class
})
public class UploadApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(UploadApiApplication.class, args);
	}

}
