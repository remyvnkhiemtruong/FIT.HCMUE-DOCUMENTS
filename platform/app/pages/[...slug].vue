<script setup lang="ts">
const route = useRoute()
const canonical
  = route.path
    .replace(/^\/FIT\.HCMUE-DOCUMENTS(?=\/|$)/, '')
    .replace(/\.html$/, '')
    .replace(/\/index$/, '/') || '/'
if (canonical !== route.path)
  await navigateTo(
    { path: canonical, query: route.query, hash: route.hash },
    { replace: true, redirectCode: 301 },
  )
const path = canonical.replace(/\/$/, '')
const parts = path.split('/').filter(Boolean)
const known = [
  'chuong-trinh',
  'mon-hoc',
  'hoc-lieu',
  'roadmap',
  'quiz',
  'dong-gop',
  'huong-dan',
  'quan-tri',
  'bo-sung',
].includes(parts[0] || '')
interface Resolution {
  support?: boolean
  target: string
  resource: { id: string, path: string } | null
}
const { data: resolution } = await useFetch<Resolution>('/api/v1/resolve', {
  query: { path: route.path },
  immediate: !known || (parts[0] === 'mon-hoc' && parts.length !== 2),
})
if (
  resolution.value
  && resolution.value.target !== route.path
  && resolution.value.target.replace(/\/$/, '') !== path
) {
  const destination = new URL(resolution.value.target, 'https://local.invalid')
  await navigateTo(
    {
      path: destination.pathname,
      query: {
        ...route.query,
        ...Object.fromEntries(destination.searchParams),
      },
      hash: route.hash || destination.hash,
    },
    { replace: true, redirectCode: 301 },
  )
}
if (!known && !resolution.value?.resource && !resolution.value?.support)
  throw createError({ statusCode: 404, message: 'Không tìm thấy trang' })
const major
  = parts[0] === 'chuong-trinh' && parts[1] !== 'tra-cuu' ? parts[1] : undefined
const term = /^hk-[1-8]$/.test(parts[2] || '')
  ? Number(parts[2]!.slice(3))
  : undefined
const catalog
  = ['hoc-lieu', 'bo-sung'].includes(parts[0] || '') || parts[1] === 'tra-cuu'
</script>

<template>
  <ProgramView
    v-if="parts[0] === 'chuong-trinh' && !catalog"
    :major="major"
    :term="term"
  />
  <ProgramView
    v-else-if="parts[0] === 'mon-hoc' && parts.length === 2"
    :course="parts[1]"
  />
  <section v-else-if="catalog">
    <h1>Kho học liệu</h1>
    <CatalogView />
  </section>
  <RoadmapView v-else-if="parts[0] === 'roadmap'" />
  <QuizView v-else-if="parts[0] === 'quiz'" />
  <ContributionEditor v-else-if="parts[0] === 'dong-gop'" />
  <AdminView v-else-if="parts[0] === 'quan-tri'" />
  <section
    v-else-if="parts[0] === 'huong-dan'"
    class="article narrow"
  >
    <h1 id="huong-dan-đong-gop">
      Hướng dẫn sử dụng
    </h1>
    <h2>Tra cứu và học tập</h2>
    <p>
      Chọn ngành, học kỳ và môn để tìm học liệu. Đăng nhập bằng email trường
      hoặc MSSV đã được quản trị cấp quyền để đọc bài và làm bài luyện tập.
    </p>
    <h2 id="nguon-tai-lieu">
      Trạng thái tài liệu
    </h2>
    <p>
      Chờ biên tập: chưa có bản được phép đọc. Đã xuất bản: có bản đã duyệt.
      Thông tin cần đối chiếu và nguồn được ghi tại từng môn, từng bài.
    </p>
    <h2>Nguồn và sử dụng</h2>
    <p>
      Học liệu dùng để tham khảo; không thay thế đề cương chính thức. Tác giả
      nguồn được ghi riêng tại mỗi bài. Không tự xem nội dung chưa xác minh là
      đáp án chính thức.
    </p>
    <h2>Đóng góp</h2>
    <p>
      Gửi bài Markdown, công thức, đề xuất sửa và tệp qua trang đóng góp. Tệp
      phải vượt qua kiểm tra và nội dung phải được duyệt trước khi chia sẻ.
    </p>
    <h2>Thông tin cá nhân</h2>
    <p>
      Email và MSSV chỉ dùng cho tài khoản và đối chiếu quyền truy cập. Tiến độ
      thuộc tài khoản của bạn. Liên hệ quản trị để chỉnh hồ sơ hoặc yêu cầu xử
      lý dữ liệu.
    </p>
  </section>
  <SupportView
    v-else-if="resolution?.support"
    :path="resolution.target"
  />
  <ResourceView
    v-else-if="resolution?.resource"
    :id="resolution.resource.id"
  />
</template>
