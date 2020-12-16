package vn.com.insee.corporate.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStream;

@Configurable
public class AppConfig {

    @EventListener(ApplicationReadyEvent.class)
    public void initOnStartUp() throws Exception{
        InputStream jsonConfig = new ClassPathResource("firebase/inseee-firebase.json").getInputStream();
        FirebaseOptions options = FirebaseOptions.builder().setCredentials(GoogleCredentials.fromStream(jsonConfig))
                .build();
        FirebaseApp.initializeApp(options);
    }
}
