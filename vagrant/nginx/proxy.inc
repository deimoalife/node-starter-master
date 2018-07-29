proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-Protocol $scheme;

client_body_buffer_size    512k;

proxy_connect_timeout      30;
proxy_send_timeout         120;
proxy_read_timeout         245;
proxy_send_lowat           12000;

proxy_buffer_size          128k;
proxy_buffers              16 256k;
proxy_busy_buffers_size    256k;
proxy_temp_file_write_size 256k;

proxy_headers_hash_max_size 1024;
proxy_headers_hash_bucket_size 512;