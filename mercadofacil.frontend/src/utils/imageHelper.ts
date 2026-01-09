export const formatImageBase64 = (base64String: string | null | undefined): string => {
  if (!base64String) return '';
  
  // Se já tem o prefixo, retorna como está
  if (base64String.startsWith('data:')) {
    return base64String;
  }
  
  // Se não tem prefixo, adiciona o prefixo padrão para imagens
  return `data:image/jpeg;base64,${base64String}`;
};
