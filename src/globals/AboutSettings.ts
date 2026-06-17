import type { GlobalConfig } from 'payload'

export const AboutSettings: GlobalConfig = {
  slug: 'about-settings',
  label: 'Nosotros',
  admin: {
    group: 'Páginas',
    // Página: Nosotros — mantiene su propio global con tabs por sección
    description: {
      es: 'Contenido de la página "Nosotros". Edita cada sección en su pestaña correspondiente.',
      en: 'Content for the "About Us" page. Edit each section in its corresponding tab.',
    },
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [

        // ── TAB 1: HERO ───────────────────────────────────────────────────────────
        {
          label: '🌿 Hero',
          description: 'Sección de portada: título, descripción e imagen',
          fields: [
            {
              name: 'heroEyebrow',
              type: 'text',
              label: { es: 'Etiqueta pequeña sobre el título', en: 'Small label above the title' },
              localized: true,
              defaultValue: 'Nosotros',
              admin: { description: 'Ej: "Nosotros" · Aparece en verde sobre el título principal' },
            },
            {
              name: 'heroTitulo',
              type: 'text',
              label: { es: 'Título principal', en: 'Main title' },
              localized: true,
              defaultValue: 'Comprometidos con tu salud.',
              admin: { description: 'Título grande de la sección' },
            },
            {
              name: 'heroSubtitulo',
              type: 'text',
              label: { es: 'Subtítulo', en: 'Subtitle' },
              localized: true,
              defaultValue: 'Distribución farmacéutica de calidad',
              admin: { description: 'Texto secundario en color apagado, debajo del título' },
            },
            {
              name: 'heroDescripcion',
              type: 'textarea',
              label: { es: 'Párrafo de descripción', en: 'Description paragraph' },
              localized: true,
              defaultValue: 'Somos una empresa farmacéutica especializada en la distribución y comercialización de productos de alta calidad, comprometidos con la salud y el bienestar de nuestros clientes en todo el país.',
            },
            {
              name: 'heroImagen',
              type: 'upload',
              relationTo: 'media',
              label: { es: 'Imagen (opcional)', en: 'Image (optional)' },
              admin: { description: 'Se mostrará en el elemento decorativo de la portada' },
            },
            {
              type: 'collapsible',
              label: '📊 Estadísticas destacadas (para uso futuro)',
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'heroStats',
                  type: 'array',
                  label: { es: 'Cifras destacadas', en: 'Key figures' },
                  defaultValue: [
                    { valor: '15+',    etiqueta: 'Años de experiencia' },
                    { valor: '500+',   etiqueta: 'Productos' },
                    { valor: '1,200+', etiqueta: 'Clientes atendidos' },
                    { valor: '100%',   etiqueta: 'Calidad garantizada' },
                  ],
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'valor',
                          type: 'text',
                          label: { es: 'Número o valor', en: 'Number or value' },
                          required: true,
                          admin: { width: '30%', description: 'Ej: 15+' },
                        },
                        {
                          name: 'etiqueta',
                          type: 'text',
                          label: { es: 'Descripción', en: 'Description' },
                          required: true,
                          localized: true,
                          admin: { width: '70%', description: 'Ej: Años de experiencia' },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ── TAB 2: MISIÓN & VISIÓN ────────────────────────────────────────────────
        {
          label: '🎯 Misión & Visión',
          description: 'Propósito y dirección estratégica de la empresa',
          fields: [
            {
              type: 'collapsible',
              label: '💚 Misión',
              admin: { initCollapsed: false },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'misionTitulo',
                      type: 'text',
                      label: { es: 'Título', en: 'Title' },
                      localized: true,
                      defaultValue: 'Nuestra Misión',
                      admin: { width: '70%' },
                    },
                    {
                      name: 'misionIcono',
                      type: 'text',
                      label: { es: 'Ícono (Lucide)', en: 'Icon (Lucide)' },
                      defaultValue: 'target',
                      admin: {
                        width: '30%',
                        description: 'target · heart · shield · leaf · star · award · hand-heart · lightbulb',
                      },
                    },
                  ],
                },
                {
                  name: 'misionTexto',
                  type: 'textarea',
                  label: { es: 'Descripción', en: 'Description' },
                  localized: true,
                  defaultValue: 'Proveer soluciones farmacéuticas de alta calidad que contribuyan al bienestar de las personas, con un equipo comprometido con la excelencia, la ética profesional y el servicio personalizado.',
                },
              ],
            },
            {
              type: 'collapsible',
              label: '💙 Visión',
              admin: { initCollapsed: false },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'visionTitulo',
                      type: 'text',
                      label: { es: 'Título', en: 'Title' },
                      localized: true,
                      defaultValue: 'Nuestra Visión',
                      admin: { width: '70%' },
                    },
                    {
                      name: 'visionIcono',
                      type: 'text',
                      label: { es: 'Ícono (Lucide)', en: 'Icon (Lucide)' },
                      defaultValue: 'eye',
                      admin: {
                        width: '30%',
                        description: 'eye · trending-up · globe · rocket · book-open · brain',
                      },
                    },
                  ],
                },
                {
                  name: 'visionTexto',
                  type: 'textarea',
                  label: { es: 'Descripción', en: 'Description' },
                  localized: true,
                  defaultValue: 'Ser la empresa farmacéutica de referencia en el país, reconocida por la calidad de nuestros productos, la solidez de nuestras alianzas y el impacto positivo en la salud de la población.',
                },
              ],
            },
          ],
        },

        // ── TAB 3: EQUIPO ─────────────────────────────────────────────────────────
        {
          label: '👥 Equipo',
          description: 'Miembros del equipo organizados por grupos (cada grupo = una pestaña en el sitio)',
          fields: [

            // ── Visibilidad de cada versión ──────────────────────────────────────
            {
              type: 'row',
              fields: [
                {
                  name: 'equipoMostrar',
                  type: 'checkbox',
                  label: { es: 'Mostrar sección de tarjetas del equipo', en: 'Show team card section' },
                  defaultValue: true,
                  admin: {
                    width: '50%',
                    description: { es: 'Sección con foto y cargo de cada miembro.', en: 'Section with photo and role of each member.' },
                  },
                },
                {
                  name: 'equipoNarrativaMostrar',
                  type: 'checkbox',
                  label: { es: 'Mostrar sección narrativa del equipo', en: 'Show team narrative section' },
                  defaultValue: false,
                  admin: {
                    width: '50%',
                    description: { es: 'Sección con texto editorial y estadísticas de trayectoria.', en: 'Section with editorial text and track-record stats.' },
                  },
                },
              ],
            },

            // ── Sección tarjetas (campos existentes) ─────────────────────────────
            {
              type: 'collapsible',
              label: '🃏 Sección de Tarjetas — contenido',
              admin: { initCollapsed: false },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'equipoEyebrow',
                      type: 'text',
                      label: { es: 'Etiqueta pequeña de sección', en: 'Small section label' },
                      localized: true,
                      defaultValue: 'Nuestro Equipo',
                      admin: { width: '40%', description: 'Ej: "Nuestro Equipo"' },
                    },
                    {
                      name: 'equipoTitulo',
                      type: 'text',
                      label: { es: 'Título de la sección', en: 'Section title' },
                      localized: true,
                      defaultValue: 'Las personas que hacen posible Qrealab',
                      admin: { width: '60%' },
                    },
                  ],
                },
                {
                  name: 'equipoGrupos',
                  type: 'array',
                  label: { es: 'Grupos de equipo', en: 'Team groups' },
                  admin: {
                    description: {
                      es: 'Cada grupo aparece como una pestaña en el sitio. Agrega los miembros dentro de cada grupo.',
                      en: 'Each group appears as a tab on the site. Add members within each group.',
                    },
                  },
                  defaultValue: [
                    {
                      nombre: 'Dirección',
                      miembros: [
                        { nombre: 'Ana Ramírez',  cargo: 'Directora General',       linkedin: '' },
                        { nombre: 'Carlos Vega',  cargo: 'Director Comercial',      linkedin: '' },
                        { nombre: 'Luis Peña',    cargo: 'Director de Operaciones', linkedin: '' },
                      ],
                    },
                    {
                      nombre: 'Equipo Profesional',
                      miembros: [
                        { nombre: 'María Torres', cargo: 'Gerente de Ventas',         linkedin: '' },
                        { nombre: 'Juan Díaz',    cargo: 'Q.F. Responsable Técnico',  linkedin: '' },
                        { nombre: 'Sofía Mendez', cargo: 'Ejecutiva de Cuentas',      linkedin: '' },
                        { nombre: 'Roberto Lara', cargo: 'Analista de Regulación',    linkedin: '' },
                      ],
                    },
                  ],
                  fields: [
                    {
                      name: 'nombre',
                      type: 'text',
                      label: { es: 'Nombre del grupo (pestaña)', en: 'Group name (tab)' },
                      required: true,
                      localized: true,
                    },
                    {
                      name: 'miembros',
                      type: 'array',
                      label: { es: 'Miembros', en: 'Members' },
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            {
                              name: 'nombre',
                              type: 'text',
                              label: { es: 'Nombre completo', en: 'Full name' },
                              required: true,
                              admin: { width: '50%' },
                            },
                            {
                              name: 'cargo',
                              type: 'text',
                              label: { es: 'Cargo / Rol', en: 'Title / Role' },
                              localized: true,
                              admin: { width: '50%' },
                            },
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            {
                              name: 'foto',
                              type: 'upload',
                              relationTo: 'media',
                              label: { es: 'Foto de perfil', en: 'Profile photo' },
                              admin: { width: '50%' },
                            },
                            {
                              name: 'linkedin',
                              type: 'text',
                              label: 'LinkedIn URL',
                              admin: {
                                width: '50%',
                                description: 'https://linkedin.com/in/nombre',
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // ── Sección narrativa (nueva) ─────────────────────────────────────────
            {
              type: 'collapsible',
              label: '💬 Sección Narrativa — contenido',
              admin: {
                initCollapsed: false,
                description: {
                  es: 'Versión alternativa: texto editorial + estadísticas de trayectoria.',
                  en: 'Alternative version: editorial text + track-record stats.',
                },
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'equipoNarrativaEyebrow',
                      type: 'text',
                      label: { es: 'Etiqueta de sección', en: 'Section label' },
                      defaultValue: 'Nuestro Equipo',
                      admin: { width: '40%', description: 'Ej: "Nuestro Equipo"' },
                    },
                    {
                      name: 'equipoNarrativaTitulo',
                      type: 'text',
                      label: { es: 'Título', en: 'Title' },
                      defaultValue: 'Las personas detrás de Qrealab tienen más de 25 años de experiencia',
                      admin: { width: '60%' },
                    },
                  ],
                },
                {
                  name: 'equipoNarrativaTexto',
                  type: 'textarea',
                  label: { es: 'Párrafo descriptivo', en: 'Descriptive paragraph' },
                  defaultValue: 'Nuestro equipo de líderes ha recorrido todos los eslabones de la industria farmacéutica: distribución, regulación sanitaria, gestión de cadena de suministro y atención especializada a clientes en todo el país. Esa trayectoria es la garantía detrás de cada producto que ponemos en tus manos.',
                },
                {
                  name: 'equipoNarrativaStats',
                  type: 'array',
                  label: { es: 'Estadísticas / cifras clave', en: 'Stats / key figures' },
                  maxRows: 4,
                  admin: {
                    description: {
                      es: 'Hasta 4 cifras que se muestran en la cuadrícula de estadísticas. La primera tendrá diseño destacado (fondo oscuro).',
                      en: 'Up to 4 figures shown in the stats grid. The first one gets a featured design (dark background).',
                    },
                  },
                  defaultValue: [
                    { valor: '25+', etiqueta: 'Años de experiencia combinada' },
                    { valor: '2',   etiqueta: 'Líderes especializados' },
                    { valor: '100%', etiqueta: 'Compromiso con la calidad' },
                    { valor: '15+', etiqueta: 'Años en el mercado' },
                  ],
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'valor',
                          type: 'text',
                          label: { es: 'Número / valor', en: 'Number / value' },
                          required: true,
                          admin: { width: '30%', description: 'Ej: 25+' },
                        },
                        {
                          name: 'etiqueta',
                          type: 'text',
                          label: { es: 'Descripción', en: 'Description' },
                          required: true,
                          admin: { width: '70%', description: 'Ej: Años de experiencia combinada' },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

          ],
        },

        // ── TAB 4: ALIADOS ────────────────────────────────────────────────────────
        {
          label: '🤝 Aliados',
          description: 'Socios y aliados estratégicos de la empresa',
          fields: [
            {
              name: 'aliadosMostrar',
              type: 'checkbox',
              label: { es: 'Mostrar sección "Aliados Estratégicos" en el sitio', en: 'Show "Strategic Allies" section on the site' },
              defaultValue: true,
              admin: {
                description: {
                  es: 'Desactiva para ocultar esta sección completamente sin borrar los datos.',
                  en: 'Disable to hide this section completely without deleting the data.',
                },
              },
            },
            {
              name: 'aliadosEyebrow',
              type: 'text',
              label: { es: 'Etiqueta pequeña de sección', en: 'Small section label' },
              localized: true,
              defaultValue: 'Aliados Estratégicos',
              admin: { description: 'Ej: "Aliados Estratégicos"' },
            },
            {
              name: 'aliadosTitulo',
              type: 'text',
              label: { es: 'Título', en: 'Title' },
              localized: true,
              defaultValue: 'Trabajamos con los mejores',
            },
            {
              name: 'aliadosSubtitulo',
              type: 'textarea',
              label: { es: 'Descripción de la sección', en: 'Section description' },
              localized: true,
              defaultValue: 'Nuestros socios estratégicos comparten nuestra visión de calidad, ética y compromiso con la salud.',
            },
            {
              name: 'aliados',
              type: 'array',
              label: { es: 'Lista de aliados', en: 'Allies list' },
              defaultValue: [
                { nombre: 'Laboratorio Alpha',   url: '' },
                { nombre: 'Distribuidora Salud', url: '' },
                { nombre: 'Farmacéutica Global', url: '' },
                { nombre: 'Bio Medicina S.A.',   url: '' },
                { nombre: 'Tecno Pharma',        url: '' },
                { nombre: 'Salud Integral',      url: '' },
              ],
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'nombre',
                      type: 'text',
                      label: { es: 'Nombre del aliado', en: 'Ally name' },
                      required: true,
                      admin: { width: '60%' },
                    },
                    {
                      name: 'url',
                      type: 'text',
                      label: { es: 'Sitio web (opcional)', en: 'Website (optional)' },
                      admin: {
                        width: '40%',
                        description: 'Ej: https://laboratorioalpha.com',
                      },
                    },
                  ],
                },
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  label: { es: 'Logo (opcional)', en: 'Logo (optional)' },
                },
              ],
            },
          ],
        },

      ],
    },
  ],
}
