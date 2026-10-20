export const DEMO_MAX_FILE_BYTES = 10 * 1024 * 1024;

export function validateFile(file) {
  if (!file) return { ok: false, message: 'Avval fayl tanlang.' };
  const name = file.name || '';
  const type = file.type || '';
  if (!/\.(pdf|png|jpe?g)$/i.test(name) || !['application/pdf', 'image/png', 'image/jpeg', ''].includes(type)) {
    return { ok: false, message: 'PDF, PNG yoki JPG fayl tanlang.' };
  }
  if (!file.size) return { ok: false, message: 'Bo‘sh fayl ochilmaydi. Boshqasini tanlang.' };
  if (file.size > DEMO_MAX_FILE_BYTES) return { ok: false, message: 'Demo uchun fayl 10 MB dan kichik bo‘lsin.' };
  return { ok: true };
}

export function validateAnswer(raw, expected) {
  const normalized = String(raw).trim().replace(/\s+/g, '');
  if (!normalized) return 'empty';
  if (!/^-?\d+$/.test(normalized)) return 'invalid';
  return Number(normalized) === expected ? 'correct' : 'incorrect';
}
