# Môi trường phát triển — BƯỚC 02

Hai cách chạy: Docker Compose khi có engine; Nuxt trực tiếp trên host với PostgreSQL đã cài. Không cần thay đổi website VitePress. Không chạy migration cũ, không reset hoặc xóa database thật.

## 1. Thiết kế và phiên bản

- Node24.18.0/bookworm-slim, cùng baseline bước01. Dockerfile có dependencies/development/build/production stages; npm ci theo lockfile riêng, runtime production chỉ copy .output, chạy user node.
- PostgreSQL **16** để cùng major với PostgreSQL16.14 đang có trên máy kiểm thử. Compose dùng official image `postgres:16-bookworm`; tag16 nhận cập nhật minor, không tự nâng major. Không tái sử dụng volume16 với image major khác nếu chưa có kế hoạch upgrade/backup.
- Driver `pg`8.23.1, pool tối đa5 kết nối; timeout connect3s, query3.5s, server statement timeout3s; pool đóng khi Nitro shutdown. Chưa chọn ORM hoặc tạo schema nghiệp vụ.
- Network bridge riêng theo Compose project. App port mặc định127.0.0.1:3001 → container3000; PostgreSQL không publish cổng ra host, app kết nối hostname `postgres`:5432.
- Named volume `<project>_postgres_data` gắn `/var/lib/postgresql/data`, đúng layout official image PostgreSQL16. `restart: unless-stopped`, DB healthcheck pg_isready, app đợi service_healthy và có healthcheck truy vấn database thực.
- Compose base chạy target production, read-only filesystem và tmpfs /tmp. Override dev chạy target development, bind mount source read-only để HMR, tmpfs .nuxt cho build cache/lock tạm, không gắn node_modules Windows/macOS vào Linux container. Có polling cho file watcher. Sửa package/lockfile hoặc scripts cần rebuild image.

Nguồn đã đối chiếu: [Docker multi-stage](https://docs.docker.com/build/building/multi-stage/), [Compose startup order](https://docs.docker.com/compose/how-tos/startup-order/), [PostgreSQL official image](https://hub.docker.com/_/postgres), [node-postgres pooling](https://node-postgres.com/features/pooling).

## 2. Windows

Yêu cầu Node24/npm11 nếu dùng npm scripts, và Docker Desktop chạy Linux containers nếu dùng Compose. Máy cần đáp ứng điều kiện WSL2/virtualization theo [hướng dẫn Docker Desktop Windows](https://docs.docker.com/desktop/setup/install/windows-install/). Cài đặt nền hệ thống và reboot cần do người quản lý máy thực hiện; repository không tự cài Docker hoặc thay cấu hình WSL.

PowerShell tại gốc repo:

```powershell
cd platform
npm ci
docker version
docker compose version
npm run env:init
npm run dev:up
```

Nếu không có Docker nhưng có PostgreSQL (như máy kiểm thử), dùng phần native bên dưới. Không cần dừng dịch vụ PostgreSQL đã cài để chạy Docker vì service container không publish5432.

## 3. Linux

Dùng [Docker Engine](https://docs.docker.com/engine/install/) và Compose plugin hoặc Docker Desktop, Node24/npm11 cho scripts. Kiểm `docker info` và `docker compose version`. Quyền truy cập daemon phải được cấu hình theo quy định máy; không chạy script repo bằng sudo để né lỗi quyền.

```sh
cd platform
npm ci
npm run env:init
npm run dev:up
```

## 4. macOS

Cài [Docker Desktop cho Mac](https://docs.docker.com/desktop/setup/install/mac-install/) phù hợp Apple Silicon/Intel, khởi động engine; dùng Node24/npm11. Các official image được chọn có kiến trúc amd64/arm64, không ép platform:linux/amd64.

```sh
cd platform
npm ci
docker version
docker compose version
npm run env:init
npm run dev:up
```

Các lệnh trên là hướng dẫn đa nền tảng; chưa chạy Docker thực tế trên Windows/Linux/macOS trong phiên này vì không có engine. Xem báo cáo để không nhầm config validation với runtime container.

## 5. Cấu hình và bí mật

`npm run env:init` tạo **.env.docker** bằng randomBytes32 (mật khẩu64 hex), mode0600 trên filesystem hỗ trợ POSIX; không in mật khẩu hoặc DSN, không ghi đè file đang tồn tại. `.env.docker` bị .gitignore/.dockerignore. Trên Windows, bảo vệ thư mục bằng ACL tài khoản máy; mode0600 không thay thế Windows ACL.

| Biến | Nơi dùng | Ý nghĩa |
| --- | --- | --- |
| COMPOSE_PROJECT_NAME | Compose | Mặc định fit-hcmue-dev; định danh containers/network/volume |
| APP_PORT | Compose | Mặc định3001 trên loopback; đổi nếu trùng cổng |
| POSTGRES_DB / POSTGRES_USER | DB container | Tên database/bootstrap role phát triển, không phải secret |
| POSTGRES_PASSWORD | DB container | Secret ngẫu nhiên trong file local |
| DATABASE_URL | Nitro/CLI server-only | DSN đầy đủ, hostname postgres trong Compose hoặc127.0.0.1 khi native |
| NUXT_DATABASE_URL | Nitro private runtime | Optional override, ưu tiên trước DATABASE_URL; không cần cho Compose mặc định |
| NUXT_PUBLIC_LEGACY_URL | Client/public | Liên kết kho học liệu cũ, tuyệt đối không chứa secret |
| NITRO_HOST / NITRO_PORT | Production Node | Container0.0.0.0:3000; host native thường127.0.0.1:3000 |

`.env.example` chỉ có giá trị không nhạy cảm và password/DSN trống. Với DB native, sao chép thành `.env`, điền DSN tại máy. Percent-encode các ký tự đặc biệt trong username/password của URL. Không đưa DSN vào build args, source code, shell command history hoặc screenshot/chat. Production `node .output/server/index.mjs` không tự đọc .env; cấp env từ host hoặc dùng `node --env-file=.env .output/server/index.mjs` cho thử local.

Không chạy `docker compose config` để chia sẻ output vì nó có thể render secrets; dùng `config --quiet`. Credentials vẫn có thể được người quản trị Docker xem qua container environment; đây là cấu hình development/local, không phải secret manager production. POSTGRES_USER trong official image là bootstrap superuser: trước production thật cần tách role ứng dụng ít quyền và quản lý secrets/backup theo thiết kế được duyệt. File Docker production ở đây là recipe build/runtime, chưa phải triển khai production được nghiệm thu.

## 6. Khởi động, dừng, xem log

```sh
npm run dev:up
npm run dev:logs
npm run dev:down
```

up kiểm Docker engine, validate config, build hai service theo dev override và chờ healthy. down chỉ dừng/xóa containers/network của project, **không xóa named volume**. logs theo dõi100 dòng gần nhất, Ctrl+C để thoát.

Truy cập `http://127.0.0.1:3001/`, `/api/health` và `/api/health/database`. Dùng APP_PORT trong .env.docker nếu đã đổi. Hai health endpoints không bị cache; liveness vẫn200 khi DB mất kết nối, readiness trả503 và không lộ driver error.

Tương đương chạy trực tiếp:

```sh
docker compose --env-file .env.docker -f docker-compose.yml -f docker-compose.dev.yml config --quiet
docker compose --env-file .env.docker -f docker-compose.yml -f docker-compose.dev.yml up --build -d --wait
docker compose --env-file .env.docker -f docker-compose.yml -f docker-compose.dev.yml down
```

Kiểm recipe production local (bỏ override dev):

```sh
docker compose --env-file .env.docker -f docker-compose.yml up --build -d --wait
docker compose --env-file .env.docker -f docker-compose.yml down
```

Dùng cùng project/volume để chuyển dev↔production local giữ dữ liệu; chỉ dùng cho môi trường thử, không trộn production thật vào dev project. Đừng dùng hai biến thể cùng lúc trên cùng project/cổng.

## 7. PostgreSQL native không cần Docker

Không đụng dịch vụ/database đã có tự động. Dùng tài khoản/database phát triển được cấp riêng. Từ platform, sao chép .env.example thành .env và điền DATABASE_URL tại file local, ví dụ cấu trúc `postgresql://USER:URL_ENCODED_PASSWORD@127.0.0.1:5432/DATABASE`. Giữ NUXT_DATABASE_URL trống nếu không cần override.

Trên Linux/macOS, đặt quyền file local bằng `chmod 600 .env` sau khi tạo; trên Windows dùng ACL của tài khoản. Không tái sử dụng thông tin truy cập production cho development.

```sh
npm ci
npm run db:check
npm run dev
```

db:check chỉ SELECT1, không tạo bảng hoặc migration; exit0 khi kết nối được, exit1 với thông báo chung nếu thiếu/sai cấu hình hoặc DB không sẵn sàng. Nuxt dev host dùng3000; chỉ mở một dev server cho một project. Trên browser, kiểm `/api/health/database`. Nếu thiếu DATABASE_URL, app và health liveness vẫn hoạt động, DB readiness503 là kết quả đúng.

## 8. Kiểm chứng persistence an toàn

**Docker engine có sẵn:**

```sh
npm run test:docker
```

Script tạo project verification có hậu tố ngẫu nhiên, env/password riêng trong .data bị ignore, không tái sử dụng dev database. Build/chạy production, ghi UUID marker bằng SQL, restart PostgreSQL rồi đọc marker; down/up và đọc lại cùng marker trên named volume; sau đó build/chạy development image, kiểm readiness và marker lần nữa. Kết thúc down giữ volume kiểm chứng. Script không có đường chạy xóa volume. Muốn dọn các volume kiểm thử phải review định danh và yêu cầu riêng, không dọn tự động.

**Không có Docker nhưng có bộ PostgreSQL binaries:**

```powershell
npm run build
npm run test:postgres -- --bin "C:/Program Files/PostgreSQL/16/bin"
```

Linux/macOS thay --bin bằng thư mục chứa initdb/pg_ctl của installation, chạy bằng user thường (initdb không chạy root trên Unix). Script tạo cluster mới trong `.data/postgres-validation/<uuid>`, mật khẩuSCRAM riêng, bind loopback ở cổng trống, không dùng service/data directory đã có. Tạo bảng probe chỉ trong cluster này; kiểm Nuxt HTTP200 và CLI, dừng cluster → kiểm503/CLI exit1/liveness200, khởi động cùng cluster → kiểm200 và marker. Cũng kiểm DSN/password không có trong HTML/response. Kết thúc dừng riêng process đã tạo, giữ cluster/log/connection.env để đối chiếu. Không dùng kết quả native này để tuyên bố đã nghiệm thu Docker volume.

## 9. Giữ dữ liệu và xử lý lỗi

- Giữ nguyên project name và .env.docker qua các lần down/up/restart; named volume thuộc project identity. Đổi project name thường tạo volume khác, không chứng minh dữ liệu cũ bị xóa.
- Không xóa .env.docker để đổi password trên volume hiện hữu: POSTGRES_* chỉ bootstrap khi volume trống. Đổi password cần quy trình SQL/secret rotation có kiểm soát sau này. env:init không ghi đè secrets có sẵn.
- Không dùng thao tác down có cờ xóa volume, volume prune hoặc Docker Desktop factory reset cho môi trường có dữ liệu. Các scripts repo không có thao tác này.
- pg_isready healthy chỉ chứng minh server sẵn sàng; readiness Nuxt còn kiểm authentication/SELECT1. Nếu postgres healthy mà app503, kiểm DSN/user/database/password tại file local, không chia sẻ giá trị nhạy cảm.
- Nếu source HMR chưa nhận thay đổi trên Docker Desktop, polling đã bật; cấu hình/env/package thay đổi cần rebuild hoặc restart app. Cache .nuxt trên tmpfs tách khỏi host, mất cache không làm mất DB.
- Named volume bền qua restart/down/up không thay thế backup. Chưa có backup/restore automation, TLS production, ORM migration, role nghiệp vụ hoặc schema học liệu trong bước02.

## 10. Trạng thái nghiệm thu

Kết quả thật, giới hạn Docker engine và các lệnh đã chạy nằm trong [STEP-02-REPORT.md](STEP-02-REPORT.md). Không tự nâng mức PASS của cấu hình thành PASS chạy container.
