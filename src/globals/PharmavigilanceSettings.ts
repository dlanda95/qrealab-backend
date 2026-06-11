import type { GlobalConfig } from 'payload'

export const PharmavigilanceSettings: GlobalConfig = {
  slug: 'pharmavigilance-settings',
  label: 'Configuración del Formulario',

  admin: {
    group: 'Farmacovigilancia',
    description: 'Define las secciones y campos del formulario de reporte de efectos adversos.',
  },

  access: {
    read:   () => true,
    update: ({ req: { user } }) => Boolean(user),
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Formulario',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'titulo',
                  type: 'text',
                  label: 'Título del formulario',
                  defaultValue: 'Formulario de reporte',
                  admin: { width: '50%' },
                },
                {
                  name: 'subtitulo',
                  type: 'text',
                  label: 'Subtítulo',
                  defaultValue: 'Efectos o reacciones adversas al medicamento',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'descripcion',
              type: 'textarea',
              label: 'Descripción (opcional)',
              admin: { rows: 2 },
            },
            {
              name: 'secciones',
              type: 'array',
              label: 'Secciones del formulario',
              minRows: 1,
              labels: { singular: 'Sección', plural: 'Secciones' },
              admin: {
                initCollapsed: false,
                description: 'Cada sección agrupa campos relacionados.',
              },
              defaultValue: [
                {
                  titulo: 'Información del Paciente',
                  campos: [
                    { clave: 'nombreCompleto',   etiqueta: 'Nombre Completo',       tipo: 'text',     ancho: 'full',  requerido: true,  activo: true, placeholder: 'Escriba su nombre completo', opciones: [] },
                    { clave: 'correo',           etiqueta: 'Correo electrónico',    tipo: 'email',    ancho: 'half',  requerido: true,  activo: true, placeholder: 'correo@ejemplo.com', opciones: [] },
                    { clave: 'numero',           etiqueta: 'Teléfono',             tipo: 'text',     ancho: 'half',  requerido: false, activo: true, placeholder: 'Ej. +51 999 999 999', opciones: [] },
                    { clave: 'sexo',             etiqueta: 'Sexo',                 tipo: 'radio',    ancho: 'half',  requerido: false, activo: true, placeholder: '', opciones: [
                      { valor: 'masculino', etiqueta: 'Masculino' },
                      { valor: 'femenino',  etiqueta: 'Femenino'  },
                      { valor: 'otro',      etiqueta: 'Otro'      },
                    ]},
                    { clave: 'edad',             etiqueta: 'Edad',                 tipo: 'number',   ancho: 'half',  requerido: false, activo: true, placeholder: '', opciones: [] },
                    { clave: 'condicionEspecial',etiqueta: '¿El paciente presenta alguna condición especial? (embarazo, lactancia, enfermedad crónica, etc.)', tipo: 'textarea', ancho: 'full', requerido: false, activo: true, placeholder: 'Describa', opciones: [] },
                    { clave: 'efectoAdverso',    etiqueta: '¿Qué efecto adverso al medicamento ha experimentado?', tipo: 'textarea', ancho: 'full', requerido: true, activo: true, placeholder: 'Describa detalladamente', opciones: [] },
                    { clave: 'duracionEfecto',   etiqueta: 'Tiempo de duración del efecto / reacción adversa', tipo: 'text', ancho: 'full', requerido: false, activo: true, placeholder: 'Ej. 3 días', opciones: [] },
                    { clave: 'inicioEfecto',     etiqueta: '¿Cuándo empezó el efecto?', tipo: 'text', ancho: 'half', requerido: false, activo: true, placeholder: 'Ej. 01/06/2026', opciones: [] },
                    { clave: 'finEfecto',        etiqueta: '¿Cuándo terminó el efecto?', tipo: 'text', ancho: 'half', requerido: false, activo: true, placeholder: 'Ej. 05/06/2026', opciones: [] },
                    { clave: 'fueTratado',       etiqueta: '¿Fue tratado el efecto / reacción adversa?', tipo: 'radio', ancho: 'half', requerido: false, activo: true, placeholder: '', opciones: [
                      { valor: 'si', etiqueta: 'Sí' },
                      { valor: 'no', etiqueta: 'No' },
                    ]},
                    { clave: 'tratamiento',      etiqueta: '¿Cuál fue el tratamiento?', tipo: 'text', ancho: 'half', requerido: false, activo: true, placeholder: 'Indique', opciones: [] },
                  ],
                },
                {
                  titulo: 'Información del Medicamento',
                  campos: [
                    { clave: 'nombreMedicamento',   etiqueta: 'Nombre del medicamento usado',                              tipo: 'text',     ancho: 'full',  requerido: true,  activo: true, placeholder: 'Nombre comercial y/o genérico', opciones: [] },
                    { clave: 'loteVencimiento',      etiqueta: 'N° de Lote y Fecha de Vencimiento',                        tipo: 'text',     ancho: 'full',  requerido: false, activo: true, placeholder: 'Ej. Lote: A123 — Vence: 12/2027', opciones: [] },
                    { clave: 'formaAdministracion',  etiqueta: 'Forma de administración y dosis del medicamento',           tipo: 'text',     ancho: 'full',  requerido: true,  activo: true, placeholder: 'Ej. Oral, 500 mg cada 8 horas', opciones: [] },
                    { clave: 'fechaInicio',          etiqueta: 'Fecha de inicio de la administración',                     tipo: 'date',     ancho: 'third', requerido: false, activo: true, placeholder: '', opciones: [] },
                    { clave: 'continuaTomando',      etiqueta: '¿Continúa tomando el medicamento?',                        tipo: 'radio',    ancho: 'third', requerido: false, activo: true, placeholder: '', opciones: [
                      { valor: 'si', etiqueta: 'Sí' },
                      { valor: 'no', etiqueta: 'No' },
                    ]},
                    { clave: 'prescripcionMedica',   etiqueta: '¿La toma fue por prescripción médica?',                    tipo: 'radio',    ancho: 'third', requerido: true,  activo: true, placeholder: '', opciones: [
                      { valor: 'si', etiqueta: 'Sí' },
                      { valor: 'no', etiqueta: 'No' },
                    ]},
                    { clave: 'otrosMedicamentos',    etiqueta: '¿Qué otros medicamentos toma o ha tomado al mismo tiempo?', tipo: 'textarea', ancho: 'full',  requerido: false, activo: true, placeholder: 'Indique nombre, dosis y frecuencia', opciones: [] },
                  ],
                },
                {
                  titulo: 'Sobre Usted',
                  campos: [
                    { clave: 'ustedEs', etiqueta: 'Usted es', tipo: 'radio', ancho: 'full', requerido: false, activo: true, placeholder: '', opciones: [
                      { valor: 'profesional', etiqueta: 'Profesional de Salud' },
                      { valor: 'paciente',    etiqueta: 'Paciente'             },
                      { valor: 'otros',       etiqueta: 'Otros'                },
                    ]},
                  ],
                },
              ],
              fields: [
                {
                  name: 'titulo',
                  type: 'text',
                  label: 'Nombre de la sección',
                  required: true,
                },
                {
                  name: 'campos',
                  type: 'array',
                  label: 'Campos',
                  minRows: 1,
                  labels: { singular: 'Campo', plural: 'Campos' },
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'clave',    type: 'text',  label: 'Clave (identificador único)', required: true, admin: { width: '30%', description: 'Sin espacios. Ej: nombreCompleto' } },
                        { name: 'etiqueta', type: 'text',  label: 'Etiqueta visible',            required: true, admin: { width: '40%' } },
                        { name: 'tipo',     type: 'select', label: 'Tipo de campo',              required: true, admin: { width: '30%' },
                          options: [
                            { label: 'Texto',       value: 'text'     },
                            { label: 'Email',       value: 'email'    },
                            { label: 'Número',      value: 'number'   },
                            { label: 'Fecha',       value: 'date'     },
                            { label: 'Área de texto', value: 'textarea'},
                            { label: 'Opciones (radio)', value: 'radio' },
                            { label: 'Desplegable (select)', value: 'select' },
                          ],
                        },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        { name: 'ancho',       type: 'select', label: 'Ancho', defaultValue: 'full', admin: { width: '25%' },
                          options: [
                            { label: 'Completo (100%)', value: 'full'  },
                            { label: 'Mitad (50%)',     value: 'half'  },
                            { label: 'Tercio (33%)',    value: 'third' },
                          ],
                        },
                        { name: 'requerido',  type: 'checkbox', label: 'Requerido',  defaultValue: false, admin: { width: '25%' } },
                        { name: 'activo',     type: 'checkbox', label: 'Activo',     defaultValue: true,  admin: { width: '25%' } },
                        { name: 'placeholder', type: 'text',    label: 'Placeholder', admin: { width: '25%' } },
                      ],
                    },
                    {
                      name: 'opciones',
                      type: 'array',
                      label: 'Opciones (para radio / select)',
                      admin: {
                        condition: (_, siblingData) =>
                          siblingData?.tipo === 'radio' || siblingData?.tipo === 'select',
                        initCollapsed: true,
                      },
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            { name: 'valor',    type: 'text', label: 'Valor',    required: true, admin: { width: '50%' } },
                            { name: 'etiqueta', type: 'text', label: 'Etiqueta', required: true, admin: { width: '50%' } },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Contacto',
          description: 'Datos que se muestran al pie del formulario.',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'emailContacto',    type: 'email', label: 'Correo de contacto',   defaultValue: 'farmacovigilancia@qrealab.com', admin: { width: '50%' } },
                { name: 'telefonoContacto', type: 'text',  label: 'Teléfono de contacto', admin: { width: '50%' } },
              ],
            },
            { name: 'direccionContacto', type: 'text', label: 'Dirección / Oficina', defaultValue: 'Oficina Central — Lima, Perú' },
          ],
        },
      ],
    },
  ],
}
