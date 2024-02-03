package ru.mativ.dicer.config;

import java.util.Map;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.HandshakeInterceptor;

import ru.mativ.dicer.controller.SocketTextHandler;
import ru.mativ.dicer.service.rpc.RpcParser;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
	private static final String VALUE_SEPORATOR = "=";
	private static final String COOKIE_SEPERATOR = ";";
	private static final String COOKIE = "cookie";
	private static final Logger LOG = LoggerFactory.getLogger(WebSocketConfig.class);

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(handler(), "/ws").setAllowedOriginPatterns("*")
				.addInterceptors(httpSessionHandshakeInterceptor());
		LOG.info("done.");
	}

	@Bean
	SocketTextHandler handler() {
		return new SocketTextHandler();
	}

	@Bean
	HandshakeInterceptor httpSessionHandshakeInterceptor() {
		return new HandshakeInterceptor() {
			@Override
			public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
					WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
				try {
					String cookies = request.getHeaders().get(COOKIE).get(0);
					String[] arr = cookies.split(COOKIE_SEPERATOR);
					for (int i = 0; i < arr.length; i++) {
						String[] pair = arr[i].split(VALUE_SEPORATOR);
						if (Objects.equals(pair[0], RpcParser.DICER_AUTH)) {
							attributes.put(RpcParser.DICER_AUTH, pair[1]);
							return true;
						}
					}
				} catch (Exception e) {
					LOG.error(e.getLocalizedMessage());
				}
				// TODO create advicer. throw new UserAuthDicerException();
				return false;
			}

			@Override
			public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
					WebSocketHandler wsHandler, Exception exception) {
			}
		};
	}
}
