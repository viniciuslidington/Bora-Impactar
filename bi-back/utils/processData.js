export const processData = (data) => {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      is_formalized: data.is_formalized,
      start_year: data.start_year,
      contact_phone: data.contact_phone,
      instagram_link: data.instagram_link,
      x_link: data.x_link,
      facebook_link: data.facebook_link,
      pix_qr_code_link: data.pix_qr_code_link,
      gallery_images_url: data.logo_photo_url, //data.gallery_images_url.join(", "), // URLs separadas por vírgulas
      skills: data.skills.map((skill) => skill.name).join(", "), // Apenas os nomes das skills
      causes: data.causes.map((cause) => cause.name).join(", "), // Apenas os nomes das causes
      sustainable_development_goals: data.sustainable_development_goals
        .map((goal) => goal.name)
        .join(", "), // Apenas os nomes dos objetivos
    };
  };
