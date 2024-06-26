package com.finder.project.user.dto;

import java.util.Map;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@ToString
public class OAuthAttributes {
    private Map<String, Object> attribute;      // OAuth 토큰 속성들
    private String nameAttributeKey;            // 사용자 이름 속성 키
    private String userName;                        // 이름(닉네임)
    private String userEmail;                       // 이메일
    // private String picture;                     // 프로필 사진 URL
    private String id;                          // 사용자 정보 식별키

    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String userName, String userEmail, String id) {
        this.attribute = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.userName = userName;
        this.userEmail = userEmail;
        // this.picture = picture;
        this.id = id;
    }

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes ) {
        if("kakao".equals(registrationId)) {
            return ofKakao(userNameAttributeName, attributes);
        }

        return null;
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
		System.out.println("ofKakao=="+attributes);
		Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
		Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
		
		log.info("kakaoAccount : " + kakaoAccount);
		log.info("profile : " + profile);
		log.info("thumbnail_image_url : " + profile.get("thumbnail_image_url"));

		return OAuthAttributes.builder()
							  .userName((String) profile.get("nickname"))
							  .userEmail((String) kakaoAccount.get("email") )
							  .id( String.valueOf( attributes.get(userNameAttributeName) ) )
							//   .picture((String) profile.get("thumbnail_image_url") )
							  .attributes(attributes)
							  .nameAttributeKey(userNameAttributeName)
							  .build();
	}
    
}









