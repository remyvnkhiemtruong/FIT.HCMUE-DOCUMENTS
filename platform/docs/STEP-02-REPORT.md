# Báo cáo BƯỚC 02 — Môi trường phát triển

Ngày21/10/2026, Asia/Bangkok. Branch main, HEAD `233575eed1caacf55e2a8e9baf6aa4ee587a0db0`. Phạm vi chỉ platform; giữ nguyên125 tệp tracked legacy và các audit/báo cáo bước trước. Không commit/push/deploy.

**Kết luận:** đã triển khai Dockerfile/Compose, cấu hình private environment, pool PostgreSQL và scripts kiểm chứng. Kết nối Nuxt → PostgreSQL thật và persistence qua stop/start cluster native đã PASS. **Chưa nghiệm thu chạy container hoặc Docker named-volume persistence** vì máy không có Docker CLI/engine; người dùng xác nhận chỉ có PostgreSQL cài sẵn. Không dùng kiểm tra native hoặc Compose config để thay cho Docker runtime PASS.

## 1. Đã thực hiện

- Dockerfile multi-stage development/build/production, Node24.18.0-bookworm-slim, npm ci theo lockfile; runtime .output chạy user node. Build không cần hoặc nhận secret database.
- Compose base production + override development; PostgreSQL16-bookworm, pg_isready, depends_on/service_healthy, network bridge riêng, named volume postgres_data. DB không publish host port; app chỉ publish loopback3001. HMR source bind read-only, cache .nuxt tạm trên tmpfs.
- .env.docker được sinh secret ngẫu nhiên tại máy, mode0600 nơi hỗ trợ; init không ghi đè file đang có, không in DSN/password. .gitignore/.dockerignore loại env, cluster data và local tools khỏi source/build context.
- Private runtimeConfig.databaseUrl và fallback DATABASE_URL đọc khi server chạy, không bake credentials vào nuxt.config/build. Chưa chọn ORM/Prisma.
- Driver pg8.23.1, bounded pool và timeouts, close hook khi Nitro shutdown. Không log raw lỗi driver hay DSN.
- Endpoint `GET /api/health/database` thực hiện SELECT1; giữ nguyên liveness `/api/health`. CLI db:check chỉ đọc, trả exit0/1 và che lỗi nhạy cảm.
- Scripts Docker startup/logs/down, verification trên project riêng và native PostgreSQL cluster riêng. Không có reset, drop hay xóa volume tự động.
- Tài liệu Windows/Linux/macOS, Docker/native, environment, thao tác giữ dữ liệu và các giới hạn production.

## 2. File thay đổi

Tám tệp chỉnh từ bước01:

```text
platform/.env.example
platform/.gitignore
platform/README.md
platform/eslint.config.mjs
platform/nuxt.config.ts
platform/package.json
platform/package-lock.json
platform/tests/integration/application.test.ts
```

Mười sáu tệp mới:

```text
platform/.dockerignore
platform/Dockerfile
platform/docker-compose.yml
platform/docker-compose.dev.yml
platform/server/api/health/database.get.ts
platform/server/utils/database.ts
platform/server/plugins/database.ts
platform/shared/types/database-health.ts
platform/scripts/check-database.mjs
platform/scripts/dev-environment.mjs
platform/scripts/verify-native-postgres.mjs
platform/scripts/verify-docker.mjs
platform/scripts/lib/environment.mjs
platform/scripts/lib/verification.mjs
platform/docs/DEVELOPMENT_ENVIRONMENT.md
platform/docs/STEP-02-REPORT.md
```

Local artifacts bị ignore: .env.docker, .data/postgres-validation/* (cluster/log/password/connection.env), .local-tools/docker-compose.exe và các build/test artifacts. Không đưa chúng vào Git. Compose standalone chỉ được tải vào thư mục ignored để validate config; không cài Docker Desktop/daemon, không đổi WSL hoặc cấu hình hệ thống.

## 3. Database và API

Không tạo schema học liệu, migration nghiệp vụ, role trên database có sẵn hoặc bảng trong database thật của người dùng. PostgreSQL Windows service `postgresql-x64-16` đang chạy với binaries16.14; chỉ dùng cùng binaries để tạo các cluster **mới, cô lập** tại .data/postgres-validation/<uuid> với SCRAM credentials ngẫu nhiên và cổng loopback trống.

Trong cluster kiểm thử riêng, tạo một bảng `environment_persistence_probe(id uuid PRIMARY KEY)` và marker UUID làm bằng chứng; đọc lại marker sau stop/start cùng data directory. Đây là dữ liệu kiểm thử, không phải migration hay reset database hiện có. Cluster và credentials được giữ trong thư mục ignored, process kiểm thử đã được dừng; service PostgreSQL có sẵn vẫn Running.

API mới:

| Endpoint | HTTP | Response |
| --- | --- | --- |
| GET /api/health/database, kết nối được | 200 | {"status":"ok","database":"connected"} |
| GET /api/health/database, thiếu cấu hình hoặc lỗi kết nối | 503 | {"status":"error","database":"unavailable"} |

Luôn Cache-Control:no-store; không có password/DSN/host/error stack trong response. `/api/health` vẫn200 khi DB dừng. Database URL chưa được cấu hình tự động cho dev server có sẵn của người dùng: khi muốn dùng database hiện có, điền tài khoản/database phát triển vào .env tại máy theo tài liệu; kiểm thử kết nối thật dùng server Nuxt riêng và cluster riêng để tránh chạm dữ liệu đó.

## 4. Lệnh và kết quả thực tế

| Lệnh / kiểm tra | Kết quả cuối | Chi tiết |
| --- | --- | --- |
| docker version / docker compose version | KHÔNG CÓ | Docker không có trong PATH/vị trí cài kiểm tra; người dùng xác nhận không có Docker |
| PostgreSQL binaries/service discovery | PASS | C:/Program Files/PostgreSQL/16/bin,16.14, service có sẵn Running |
| npm view pg/@types/pg và npm install | PASS | Khóa pg8.23.1/@types8.23.1; npm vẫn báo11 high từ dependency tree đã có ở bước01 |
| npm run env:init, chạy lại và so SHA-256 | PASS | Sinh .env.docker, lần sau giữ nguyên từng byte credentials |
| Docker Compose standalone v5.6.0 official download/checksum | PASS | Binary ở ignored .local-tools; SHA-256 đối chiếu checksum release chính thức |
| Compose base config --quiet | PASS | .env.docker, docker-compose.yml |
| Compose base+dev config --quiet | PASS | Merge docker-compose.yml + docker-compose.dev.yml |
| Assertions trên config --format json trong bộ nhớ | PASS | Đúng target/read-only settings, healthy dependency, DB không publish port, app loopback, cùng named volume, source mounts ro, cache tmpfs; không in rendered secrets |
| Official Docker registry manifest checks | PASS | node:24.18.0-bookworm-slim và postgres:16-bookworm đều HTTP200; chỉ xác minh tag tồn tại, không pull/build/run image |
| npm run lint:fix và npm run lint | PASS, exit0 | Zero lint warnings; private data/tools excluded |
| npm run typecheck | PASS, exit0 | Strict Nuxt/server/shared/tests/config |
| npm run test:integration | PASS, exit0 | Nuxt production build8.32s, output2.3MB/593kB gzip;6/6 Vitest HTTP |
| npm run test:postgres -- --bin "C:/Program Files/PostgreSQL/16/bin" | PASS, exit0 | SCRAM connection; HTTP200; DSN/password không có trong SSR HTML; CLI0; DB stop → API503 không lộ secret + liveness200 + CLI1; start → API200, marker còn nguyên |
| CLI malformed URL/redaction check | PASS | Exit1, không in password probe hoặc raw parse exception |
| npm run test:browser | PASS, exit0 | 3/3 Playwright,4.7s; home/identity/focus,404 recovery,mobile |
| npm ci --dry-run --ignore-scripts --no-audit | PASS, exit0 | Lock consistency, không tuyên bố cài sạch full npm ci |
| npm run dev:up | BLOCKED, exit1 | Dừng tại kiểm Docker CLI/engine; không tạo container hoặc đụng database |
| npm run test:docker | BLOCKED, exit1 | Cùng guard; chưa chạy các assertions persistence trong container |
| Legacy npm run check | PASS, exit0 | 14/14 giữ danh mục,77 routes,math/quiz/checklist |
| So125 legacy SHA-256 với BASELINE | PASS | Không thay đổi từng byte source/workflow/root package-lock |
| Generated-secret scan và ignore checks | PASS | Các password local mới không có trong Git-visible platform source, .env.docker/.data/.local-tools bị ignore |
| Existing PostgreSQL service / validation processes | PASS | Service cũ Running; không còn PostgreSQL server của cluster verification đang chạy |

Hai source kiểm checksum: [Compose official release v5.6.0](https://github.com/docker/compose/releases/tag/v5.6.0) và asset checksum tương ứng. Registry manifests đã đọc trong phiên:

```text
node:24.18.0-bookworm-slim
sha256:6f7b03f7c2c8e2e784dcf9295400527b9b1270fd37b7e9a7285cf83b6951452d
postgres:16-bookworm
sha256:d81f7b51697014367236d07ec58b54153fc28f828b72bf247fe5c7487520bcb0
```

Dockerfile/Compose sử dụng tags ở source, không tuyên bố pin các digest này. Image manifests tồn tại không chứng minh container sẽ chạy thành công.

## 5. Lỗi trong quá trình kiểm tra và cách sửa

- Native verification đầu bị chờ do Windows postgres kế thừa pipe handle từ pg_ctl dù pg_ctl đã thoát. Đã dừng đúng cluster kiểm thử mới theo -D riêng (không dừng service/database cũ), sửa subprocess redirect vào file descriptor/log riêng và đặt timeout; chạy lại native verification thành công. Không bỏ assertion hoặc đổi sang mock.
- Tải checksum Compose trả byte array ở PowerShell; sửa giải mã UTF-8 rồi đối chiếu SHA-256 thành công. Không ghi checksum check ban đầu là PASS.
- Một assertion ad hoc ban đầu đòi trường read_only:false trong JSON, nhưng Compose chuẩn hóa false thành trường vắng; đã kiểm lại Boolean(field) và các giá trị merge thực tế, PASS. Source override vẫn read_only:false đúng yêu cầu writable dev cache.
- Docker commands trả exit1 vì engine không có; đây là giới hạn môi trường chưa giải quyết, không phải container test PASS. Không lắp engine giả, không cài hệ thống hoặc reboot máy để che giới hạn.
- Browser404 có Vue Router warning như bước01, và warning NO_COLOR/FORCE_COLOR; tests vẫn PASS. Dependency audit11 high giữ nguyên vấn đề upstream đã ghi ở báo cáo bước01; không chạy audit fix --force.

## 6. Acceptance criteria và phần còn thiếu

| Nghiệm thu | Trạng thái |
| --- | --- |
| Dockerfile phù hợp dev/prod | ĐÃ TRIỂN KHAI; chưa build/run container |
| Compose khởi động thành công | CHƯA NGHIỆM THU — thiếu Docker engine |
| Nuxt kết nối PostgreSQL | PASS trên PostgreSQL16.14 native và bản Nuxt production thật; chưa xác minh trong Docker network |
| Không có secret thật trong Git | PASS cho thay đổi mới/credentials sinh trong phiên; không tuyên bố quét toàn bộ lịch sử Git |
| Dữ liệu còn sau restart | PASS trên cluster native; named-volume restart và down/up trong Docker CHƯA NGHIỆM THU |
| Tài liệu Windows/Linux/macOS | ĐÃ VIẾT; runtime Docker trên các hệ điều hành chưa được kiểm thử |
| Không ảnh hưởng VitePress/production/database thật | PASS — legacy hashes giữ nguyên, không deploy/reset/drop |

Cần Docker Engine/Desktop với Compose để chạy `npm run test:docker`; script đã chuẩn bị project/volume verification riêng, kiểm cả image production/development và stop/recreate containers mà giữ volume. Chưa có DB schema/ORM, migrations, secret manager, TLS production, role ứng dụng ít quyền hoặc backup/restore automation. Bootstrap role của official PostgreSQL image dùng cho dev/local, không coi là cấu hình phân quyền production đã hoàn thiện.

## 7. Commit và bước tiếp theo

Commit đề xuất: `feat(platform): add Docker environments and PostgreSQL readiness checks`.

Hướng dẫn: [DEVELOPMENT_ENVIRONMENT.md](DEVELOPMENT_ENVIRONMENT.md), [README](../README.md). Chạy Docker verification khi có engine để hoàn tất nghiệm thu môi trường. Sau đó chờ người dùng giao bước tiếp theo về schema/ORM; chưa triển khai bước03. Không tự đổi workflow deploy hoặc dữ liệu thật.
