import { FormEvent, ReactNode, useState } from "react";

type View =
  | "login"
  | "dashboard"
  | "lotes"
  | "calendario"
  | "insumos"
  | "cosechas"
  | "reportes"
  | "usuarios"
  | "field"
  | "field-calendar"
  | "field-application"
  | "field-harvest";

type IconName =
  | "grid"
  | "plot"
  | "calendar"
  | "box"
  | "harvest"
  | "chart"
  | "users"
  | "bell"
  | "search"
  | "plus"
  | "arrow"
  | "sprout"
  | "flask"
  | "alert"
  | "clock"
  | "more"
  | "download"
  | "chevron"
  | "logout"
  | "camera"
  | "check"
  | "leaf"
  | "menu";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    plot: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /><path d="M4 10h6M10 4h10v9h-4" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
    box: <><path d="m21 8-9 5-9-5 9-5 9 5Z" /><path d="m3 8 9 5 9-5v10l-9 5-9-5V8Z" /><path d="M12 13v10" /></>,
    harvest: <><path d="M12 22V9M7 5c3 0 5 2 5 5-3 0-5-2-5-5ZM17 3c0 3-2 5-5 5 0-3 2-5 5-5Z" /><path d="M5 22h14M7 17h10" /></>,
    chart: <><path d="M4 19V9M10 19V5M16 19v-7M22 19H2" /><path d="m3 7 6-3 6 5 6-7" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    sprout: <><path d="M12 22V9" /><path d="M7 4c3 0 5 2 5 5-3 0-5-2-5-5ZM17 3c0 3-2 5-5 5 0-3 2-5 5-5Z" /></>,
    flask: <><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" /><path d="M7 16h10" /></>,
    alert: <><path d="M12 3 2 21h20L12 3Z" /><path d="M12 9v5M12 18h.01" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    download: <><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    logout: <><path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-5" /></>,
    camera: <><path d="M4 7h4l2-3h4l2 3h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" /><circle cx="12" cy="14" r="4" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    leaf: <><path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-8 10-16Z" /><path d="M4 21c3-7 7-10 13-13" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  };
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const navItems: { id: View; label: string; icon: IconName }[] = [
  { id: "dashboard", label: "Dashboard", icon: "grid" },
  { id: "lotes", label: "Lotes", icon: "plot" },
  { id: "calendario", label: "Calendario", icon: "calendar" },
  { id: "insumos", label: "Insumos", icon: "box" },
  { id: "cosechas", label: "Cosechas", icon: "harvest" },
  { id: "reportes", label: "Reportes", icon: "chart" },
  { id: "usuarios", label: "Usuarios", icon: "users" },
];

const pageMeta: Partial<Record<View, [string, string]>> = {
  dashboard: ["Resumen general", "Monitorea el estado de tu operación agrícola."],
  lotes: ["Gestión de lotes", "Administra las áreas productivas de la finca."],
  calendario: ["Calendario de aplicaciones", "Planifica las labores agrícolas por lote."],
  insumos: ["Inventario de insumos", "Controla existencias y consumos."],
  cosechas: ["Registro de cosechas", "Consulta la producción diaria por lote."],
  reportes: ["Reportes de rendimiento", "Analiza la producción por lote y temporada."],
  usuarios: ["Gestión de usuarios", "Administra el acceso del equipo."],
};

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <div className="brand-mark"><Icon name="leaf" size={compact ? 22 : 28} /></div>
      <div><strong>SIGA</strong><span>Sistema de Gestión Agrícola</span></div>
    </div>
  );
}

function Button({ children, variant = "primary", icon, type = "button", onClick, className = "" }: { children: ReactNode; variant?: "primary" | "secondary" | "ghost" | "white"; icon?: IconName; type?: "button" | "submit"; onClick?: () => void; className?: string }) {
  return <button type={type} className={`btn btn-${variant} ${className}`} onClick={onClick}>{icon && <Icon name={icon} size={18} />}{children}</button>;
}

function Login({ onLogin }: { onLogin: (role: "admin" | "field") => void }) {
  const [role, setRole] = useState<"admin" | "field">("admin");
  const submit = (event: FormEvent) => { event.preventDefault(); onLogin(role); };
  return (
    <main className="login">
      <section className="login-visual">
        <img src="https://images.unsplash.com/photo-1619142239028-8f6ec8e767c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1400" alt="Cultivo de plátano en Colombia" />
        <div className="login-overlay" />
        <div className="login-visual-content">
          <Brand />
          <div className="login-statement">
            <span className="eyebrow light">Gestión inteligente del campo</span>
            <h1>Cultivamos información.<br />Cosechamos decisiones.</h1>
            <p>Control integral de lotes, aplicaciones, insumos y cosechas para una operación agrícola más eficiente.</p>
          </div>
          <p className="photo-credit">Fotografía de Carolina Zuluaga · Unsplash</p>
        </div>
      </section>
      <section className="login-form-side">
        <div className="login-card">
          <div className="mobile-brand"><Brand compact /></div>
          <span className="eyebrow">Bienvenido de nuevo</span>
          <h2>Inicia sesión</h2>
          <p className="muted">Ingresa tus datos para acceder a la plataforma.</p>
          <form onSubmit={submit}>
            <label>Correo electrónico<input type="email" defaultValue="admin@siga.co" placeholder="nombre@siga.co" required /></label>
            <label>Contraseña
              <div className="password-wrap"><input type="password" defaultValue="administrador" required /><span>Mostrar</span></div>
            </label>
            <div className="role-selector" aria-label="Seleccionar rol">
              <button type="button" className={role === "admin" ? "selected" : ""} onClick={() => setRole("admin")}>Administrador</button>
              <button type="button" className={role === "field" ? "selected" : ""} onClick={() => setRole("field")}>Trabajo de campo</button>
            </div>
            <Button type="submit" className="full">Iniciar sesión <Icon name="arrow" size={18} /></Button>
          </form>
          <p className="login-help">¿Necesitas ayuda? <strong>Contacta al administrador</strong></p>
        </div>
      </section>
    </main>
  );
}

function Sidebar({ view, setView, logout }: { view: View; setView: (v: View) => void; logout: () => void }) {
  return (
    <aside className="sidebar">
      <Brand compact />
      <nav>
        <span className="nav-label">MENÚ PRINCIPAL</span>
        {navItems.map((item) => <button key={item.id} onClick={() => setView(item.id)} className={view === item.id ? "active" : ""}><Icon name={item.icon} />{item.label}</button>)}
      </nav>
      <div className="sidebar-foot">
        <div className="user-block"><span className="avatar">JM</span><div><strong>Juan Martínez</strong><small>Administrador</small></div><Icon name="more" /></div>
        <button className="logout" onClick={logout}><Icon name="logout" /> Cerrar sesión</button>
      </div>
    </aside>
  );
}

function Topbar({ title, subtitle, openMenu }: { title: string; subtitle: string; openMenu: () => void }) {
  return (
    <header className="topbar">
      <button className="menu-button" onClick={openMenu}><Icon name="menu" /></button>
      <div><h1>{title}</h1><p>{subtitle}</p></div>
      <div className="topbar-actions">
        <button className="icon-button"><Icon name="bell" /><span className="notification-dot" /></button>
        <div className="date-pill"><Icon name="calendar" size={17} /><span>12 de junio, 2025</span></div>
      </div>
    </header>
  );
}

const kpis = [
  { label: "Lotes activos", value: "12", note: "+2 este semestre", icon: "plot" as IconName, tone: "green" },
  { label: "Insumos críticos", value: "3", note: "Requieren atención", icon: "flask" as IconName, tone: "amber" },
  { label: "Cosecha del mes", value: "8.450", unit: "kg", note: "+12,4% vs. mes anterior", icon: "harvest" as IconName, tone: "blue" },
];

function Dashboard() {
  return (
    <div className="page-content">
      <div className="kpi-grid">
        {kpis.map((kpi) => <article className="kpi-card" key={kpi.label}><div className={`kpi-icon ${kpi.tone}`}><Icon name={kpi.icon} /></div><div><span>{kpi.label}</span><strong>{kpi.value} <small>{kpi.unit}</small></strong><em className={kpi.tone === "amber" ? "warning" : ""}>{kpi.note}</em></div></article>)}
      </div>
      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <PanelHeader title="Producción mensual" subtitle="Kilogramos cosechados en 2025"><select><option>Últimos 6 meses</option></select></PanelHeader>
          <div className="chart-area">
            <div className="chart-y"><span>10k</span><span>7.5k</span><span>5k</span><span>2.5k</span><span>0</span></div>
            <div className="bar-chart">
              {["ENE", "FEB", "MAR", "ABR", "MAY", "JUN"].map((month, i) => <div className={`bar-column bar-column-${i + 1}`} key={month}><div className={`bar ${i === 5 ? "current" : ""}`}>{i === 5 && <span>8.450 kg</span>}</div><small>{month}</small></div>)}
            </div>
          </div>
        </section>
        <section className="panel alerts-panel">
          <PanelHeader title="Alertas activas" subtitle="3 tareas requieren atención"><button className="text-button">Ver todas</button></PanelHeader>
          <div className="alert-list">
            <Alert tone="red" icon="alert" title="Aplicación vencida" text="Fungicida · Lote El Porvenir" time="Venció hace 2 días" />
            <Alert tone="amber" icon="clock" title="Aplicación para hoy" text="Fertilizante · Lote La Esperanza" time="Programada 08:00 a. m." />
            <Alert tone="blue" icon="box" title="Stock mínimo alcanzado" text="Fungicida Mancozeb 80 WP" time="Quedan 5 kg" />
          </div>
        </section>
      </div>
      <section className="panel schedule-panel">
        <PanelHeader title="Próximas aplicaciones" subtitle="Programación de los siguientes 7 días"><button className="text-button">Ver calendario <Icon name="arrow" size={15} /></button></PanelHeader>
        <div className="schedule-row"><DateBox day="13" month="JUN" /><div className="schedule-main"><span className="tag green">FERTILIZANTE</span><strong>Aplicación NPK 15-15-15</strong><small>Lote La Esperanza · 3,5 ha</small></div><div className="responsible"><span className="avatar pale">CR</span><div><small>Responsable</small><strong>Carlos Rodríguez</strong></div></div><span className="status pending">Pendiente</span><button className="round-more"><Icon name="more" /></button></div>
        <div className="schedule-row"><DateBox day="15" month="JUN" /><div className="schedule-main"><span className="tag purple">NUTRICIÓN</span><strong>Aplicación foliar</strong><small>Lote Santa María · 2,8 ha</small></div><div className="responsible"><span className="avatar pale">AM</span><div><small>Responsable</small><strong>Ana Méndez</strong></div></div><span className="status planned">Programada</span><button className="round-more"><Icon name="more" /></button></div>
      </section>
    </div>
  );
}

function PanelHeader({ title, subtitle, children }: { title: string; subtitle: string; children?: ReactNode }) {
  return <div className="panel-header"><div><h2>{title}</h2><p>{subtitle}</p></div>{children}</div>;
}

function Alert({ tone, icon, title, text, time }: { tone: string; icon: IconName; title: string; text: string; time: string }) {
  return <div className="alert-item"><div className={`alert-icon ${tone}`}><Icon name={icon} /></div><div><strong>{title}</strong><p>{text}</p><small>{time}</small></div><Icon name="chevron" size={17} /></div>;
}

function DateBox({ day, month }: { day: string; month: string }) {
  return <div className="date-box"><strong>{day}</strong><span>{month}</span></div>;
}

const initialLots = [
  { name: "La Esperanza", code: "LT-001", area: "3,5 ha", crop: "Banano", status: "Activo", planted: "12 ene 2024" },
  { name: "El Porvenir", code: "LT-002", area: "4,2 ha", crop: "Plátano", status: "Activo", planted: "03 mar 2024" },
  { name: "Santa María", code: "LT-003", area: "2,8 ha", crop: "Banano", status: "Activo", planted: "18 ago 2023" },
  { name: "Los Naranjos", code: "LT-004", area: "1,9 ha", crop: "Plátano", status: "Inactivo", planted: "25 feb 2023" },
  { name: "El Recuerdo", code: "LT-005", area: "3,1 ha", crop: "Banano", status: "Activo", planted: "09 abr 2024" },
];

function LotsPage() {
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState("");
  const rows = initialLots.filter((lot) => lot.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="page-content">
      <section className="panel table-panel">
        <div className="table-toolbar"><div className="search-box"><Icon name="search" size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nombre o código..." /></div><div className="toolbar-right"><select><option>Todos los cultivos</option><option>Banano</option><option>Plátano</option></select><Button icon="plus" onClick={() => setModal(true)}>Nuevo lote</Button></div></div>
        <div className="table-wrap"><table><thead><tr><th>LOTE</th><th>ÁREA</th><th>CULTIVO</th><th>FECHA DE SIEMBRA</th><th>ESTADO</th><th /></tr></thead><tbody>{rows.map((lot) => <tr key={lot.code}><td><div className="lot-name"><span className={`crop-icon ${lot.crop === "Banano" ? "banana" : ""}`}><Icon name="leaf" /></span><div><strong>{lot.name}</strong><small>{lot.code}</small></div></div></td><td>{lot.area}</td><td><span className="crop-label">{lot.crop}</span></td><td>{lot.planted}</td><td><span className={`status ${lot.status === "Activo" ? "active" : "inactive"}`}><i />{lot.status}</span></td><td><button className="round-more"><Icon name="more" /></button></td></tr>)}</tbody></table></div>
        <div className="table-footer"><span>Mostrando 1 a {rows.length} de 12 lotes</span><div><button disabled>Anterior</button><button className="page-active">1</button><button>2</button><button>3</button><button>Siguiente</button></div></div>
      </section>
      {modal && <div className="modal-backdrop" onMouseDown={() => setModal(false)}><div className="modal" onMouseDown={(e) => e.stopPropagation()}><div className="modal-title"><div><span className="eyebrow">NUEVO REGISTRO</span><h2>Registrar lote</h2></div><button onClick={() => setModal(false)}>×</button></div><p>Agrega una nueva área productiva a la finca.</p><form onSubmit={(e) => { e.preventDefault(); setModal(false); }}><label>Nombre del lote<input placeholder="Ej. La Esperanza" required /></label><div className="form-row"><label>Área (hectáreas)<input type="number" step="0.1" placeholder="0,0" required /></label><label>Tipo de cultivo<select><option>Seleccionar</option><option>Banano</option><option>Plátano</option></select></label></div><div className="modal-actions"><Button variant="secondary" onClick={() => setModal(false)}>Cancelar</Button><Button type="submit">Guardar lote</Button></div></form></div></div>}
    </div>
  );
}

function CalendarPage() {
  const [saved, setSaved] = useState(false);
  return (
    <div className="page-content split-page">
      <section className="panel form-panel">
        <div className="form-panel-heading"><span className="section-icon"><Icon name="calendar" /></span><div><h2>Nueva programación</h2><p>Define la próxima labor agrícola.</p></div></div>
        {saved && <div className="success-message"><Icon name="check" /> Aplicación programada correctamente.</div>}
        <form onSubmit={(e) => { e.preventDefault(); setSaved(true); }}>
          <label>Lote<select required><option value="">Selecciona un lote</option><option>La Esperanza · 3,5 ha</option><option>El Porvenir · 4,2 ha</option><option>Santa María · 2,8 ha</option></select></label>
          <div className="form-row"><label>Fecha programada<input type="date" defaultValue="2025-06-18" /></label><label>Hora<input type="time" defaultValue="08:00" /></label></div>
          <label>Tipo de aplicación<select><option>Fertilizante</option><option>Fungicida</option><option>Nutrición</option></select></label>
          <label>Responsable<select><option>Carlos Rodríguez</option><option>Ana Méndez</option></select></label>
          <label>Indicaciones<textarea placeholder="Agrega observaciones para el trabajador de campo..." rows={4} /></label>
          <Button type="submit" className="full">Programar aplicación <Icon name="arrow" /></Button>
        </form>
      </section>
      <section className="panel agenda-panel"><PanelHeader title="Agenda próxima" subtitle="Junio 2025" /><div className="agenda-date"><span>HOY · 12 JUN</span></div><AgendaItem color="amber" title="Control de sigatoka" meta="El Porvenir · 07:30 a. m." type="Fungicida" /><div className="agenda-date"><span>MAÑANA · 13 JUN</span></div><AgendaItem color="green" title="Aplicación NPK 15-15-15" meta="La Esperanza · 08:00 a. m." type="Fertilizante" /><div className="agenda-date"><span>DOMINGO · 15 JUN</span></div><AgendaItem color="purple" title="Aplicación foliar" meta="Santa María · 06:30 a. m." type="Nutrición" /></section>
    </div>
  );
}

function AgendaItem({ color, title, meta, type }: { color: string; title: string; meta: string; type: string }) {
  return <div className={`agenda-item ${color}`}><i /><div><strong>{title}</strong><span>{meta}</span></div><small>{type}</small></div>;
}

function ReportsPage() {
  return (
    <div className="page-content">
      <div className="report-toolbar"><div><label>PERIODO<select><option>Enero — Junio 2025</option></select></label><label>LOTE<select><option>Todos los lotes</option></select></label></div><Button variant="secondary" icon="download">Exportar PDF</Button></div>
      <div className="report-summary"><article><span>PRODUCCIÓN TOTAL</span><strong>42.680 <small>kg</small></strong><em>+8,6% respecto al periodo anterior</em></article><article><span>RENDIMIENTO PROMEDIO</span><strong>2.184 <small>kg/ha</small></strong><em>Meta: 2.000 kg/ha</em></article><article><span>MEJOR LOTE</span><strong>La Esperanza</strong><em>2.740 kg/ha</em></article></div>
      <div className="dashboard-grid reports-grid">
        <section className="panel line-panel"><PanelHeader title="Evolución de la producción" subtitle="Producción mensual en kilogramos" /><div className="line-chart"><div className="grid-lines"><i /><i /><i /><i /></div><svg viewBox="0 0 600 230" preserveAspectRatio="none"><path className="area" d="M0 192 C80 160 90 170 120 150 S210 130 240 142 S330 96 360 110 S450 90 480 99 S550 48 600 55 L600 230 L0 230Z" /><path className="line" d="M0 192 C80 160 90 170 120 150 S210 130 240 142 S330 96 360 110 S450 90 480 99 S550 48 600 55" /></svg><div className="month-axis"><span>ENE</span><span>FEB</span><span>MAR</span><span>ABR</span><span>MAY</span><span>JUN</span></div></div></section>
        <section className="panel ranking-panel"><PanelHeader title="Rendimiento por lote" subtitle="Kilogramos por hectárea" />{[["La Esperanza","2.740"],["Santa María","2.380"],["El Recuerdo","2.150"],["El Porvenir","1.940"]].map((r,i)=><div className={`rank rank-${i + 1}`} key={r[0]}><span>{i+1}</span><div><strong>{r[0]}</strong><i><b /></i></div><em>{r[1]} kg/ha</em></div>)}</section>
      </div>
    </div>
  );
}

const supplies = [
  { name: "Mancozeb 80 WP", code: "INS-001", category: "Fungicida", provider: "Agroinsumos del Caribe", stock: 5, minimum: 10, unit: "kg", cost: "$18.500" },
  { name: "NPK 15-15-15", code: "INS-002", category: "Fertilizante", provider: "Fertilizantes del Norte", stock: 46, minimum: 20, unit: "kg", cost: "$4.200" },
  { name: "Nutrifoliar Banano", code: "INS-003", category: "Nutrición", provider: "Campo Verde S.A.S.", stock: 18, minimum: 8, unit: "L", cost: "$32.800" },
  { name: "Propiconazol 25 EC", code: "INS-004", category: "Fungicida", provider: "Agroinsumos del Caribe", stock: 7, minimum: 7, unit: "L", cost: "$41.600" },
];

function SuppliesPage() {
  const [modal, setModal] = useState(false);
  const [tab, setTab] = useState<"inventory" | "providers">("inventory");
  return <div className="page-content">
    <div className="module-stats">
      <article><span className="mini-icon green"><Icon name="box" /></span><div><small>Productos registrados</small><strong>24</strong></div></article>
      <article><span className="mini-icon amber"><Icon name="alert" /></span><div><small>Stock mínimo</small><strong>3</strong></div></article>
      <article><span className="mini-icon blue"><Icon name="users" /></span><div><small>Proveedores activos</small><strong>8</strong></div></article>
    </div>
    <section className="panel table-panel">
      <div className="tab-toolbar"><div className="segmented"><button className={tab === "inventory" ? "active" : ""} onClick={() => setTab("inventory")}>Inventario</button><button className={tab === "providers" ? "active" : ""} onClick={() => setTab("providers")}>Proveedores</button></div><Button icon="plus" onClick={() => setModal(true)}>{tab === "inventory" ? "Nuevo insumo" : "Nuevo proveedor"}</Button></div>
      {tab === "inventory" ? <div className="table-wrap"><table><thead><tr><th>PRODUCTO</th><th>CATEGORÍA</th><th>PROVEEDOR</th><th>EXISTENCIA</th><th>COSTO UNITARIO</th><th>ESTADO</th><th /></tr></thead><tbody>{supplies.map((item) => { const critical = item.stock <= item.minimum; return <tr key={item.code}><td><div className="lot-name"><span className="crop-icon"><Icon name="flask" /></span><div><strong>{item.name}</strong><small>{item.code}</small></div></div></td><td><span className="crop-label">{item.category}</span></td><td>{item.provider}</td><td><div className="stock-cell"><strong>{item.stock} {item.unit}</strong><span>Mín. {item.minimum} {item.unit}</span></div></td><td>{item.cost}</td><td><span className={`status ${critical ? "critical" : "active"}`}><i />{critical ? "Stock bajo" : "Disponible"}</span></td><td><button className="round-more"><Icon name="more" /></button></td></tr>; })}</tbody></table></div> :
      <div className="provider-grid">{[["Agroinsumos del Caribe","300 456 8790","6 productos"],["Fertilizantes del Norte","315 227 1420","4 productos"],["Campo Verde S.A.S.","301 885 4432","8 productos"],["Soluciones Agrícolas","320 941 7290","6 productos"]].map((provider) => <article className="provider-card" key={provider[0]}><span><Icon name="users" /></span><div><strong>{provider[0]}</strong><p>{provider[1]}</p><small>{provider[2]}</small></div><button className="round-more"><Icon name="more" /></button></article>)}</div>}
    </section>
    {modal && <div className="modal-backdrop" onMouseDown={() => setModal(false)}><div className="modal" onMouseDown={(e) => e.stopPropagation()}><div className="modal-title"><div><span className="eyebrow">NUEVO REGISTRO</span><h2>{tab === "inventory" ? "Registrar insumo" : "Registrar proveedor"}</h2></div><button onClick={() => setModal(false)}>×</button></div><p>Completa la información para agregarlo al sistema.</p><form onSubmit={(e) => { e.preventDefault(); setModal(false); }}>{tab === "inventory" ? <><label>Nombre comercial<input placeholder="Nombre del producto" required /></label><div className="form-row"><label>Categoría<select><option>Fungicida</option><option>Fertilizante</option><option>Nutrición</option><option>Otro</option></select></label><label>Proveedor<select><option>Agroinsumos del Caribe</option><option>Campo Verde S.A.S.</option></select></label></div><div className="form-row"><label>Cantidad actual<input type="number" placeholder="0,00" /></label><label>Cantidad mínima<input type="number" placeholder="0,00" /></label></div><label>Costo unitario<input type="number" placeholder="$ 0" /></label></> : <><label>Nombre o razón social<input placeholder="Nombre del proveedor" required /></label><label>Teléfono<input type="tel" placeholder="300 000 0000" /></label></>}<div className="modal-actions"><Button variant="secondary" onClick={() => setModal(false)}>Cancelar</Button><Button type="submit">Guardar registro</Button></div></form></div></div>}
  </div>;
}

const harvests = [
  { date: "12 jun 2025", lot: "La Esperanza", crop: "Banano", amount: "1.240 kg", quality: "Primera", worker: "Carlos Rodríguez" },
  { date: "10 jun 2025", lot: "El Porvenir", crop: "Plátano", amount: "980 kg", quality: "Primera", worker: "Ana Méndez" },
  { date: "08 jun 2025", lot: "Santa María", crop: "Banano", amount: "1.085 kg", quality: "Segunda", worker: "Carlos Rodríguez" },
  { date: "05 jun 2025", lot: "El Recuerdo", crop: "Banano", amount: "760 kg", quality: "Descarte", worker: "Luis Pérez" },
];

function HarvestsPage() {
  return <div className="page-content">
    <div className="module-stats">
      <article><span className="mini-icon green"><Icon name="harvest" /></span><div><small>Cosecha del mes</small><strong>8.450 kg</strong></div></article>
      <article><span className="mini-icon blue"><Icon name="plot" /></span><div><small>Lotes cosechados</small><strong>7</strong></div></article>
      <article><span className="mini-icon amber"><Icon name="chart" /></span><div><small>Calidad primera</small><strong>76%</strong></div></article>
    </div>
    <section className="panel table-panel"><div className="table-toolbar"><div className="search-box"><Icon name="search" size={18} /><input placeholder="Buscar por lote..." /></div><div className="toolbar-right"><input type="month" defaultValue="2025-06" /><Button variant="secondary" icon="download">Exportar</Button></div></div><div className="table-wrap"><table><thead><tr><th>FECHA</th><th>LOTE</th><th>CULTIVO</th><th>CANTIDAD</th><th>CALIDAD</th><th>REGISTRADO POR</th><th /></tr></thead><tbody>{harvests.map((item) => <tr key={`${item.date}-${item.lot}`}><td>{item.date}</td><td><strong>{item.lot}</strong></td><td><span className="crop-label">{item.crop}</span></td><td><strong className="amount">{item.amount}</strong></td><td><span className={`quality quality-${item.quality.toLowerCase()}`}>{item.quality}</span></td><td><div className="worker"><span className="avatar pale">{item.worker.split(" ").map(n => n[0]).slice(0,2).join("")}</span>{item.worker}</div></td><td><button className="round-more"><Icon name="more" /></button></td></tr>)}</tbody></table></div><div className="table-footer"><span>4 registros de cosecha en junio</span><div><button disabled>Anterior</button><button className="page-active">1</button><button>2</button><button>Siguiente</button></div></div></section>
  </div>;
}

const users = [
  { name: "Juan Martínez", initials: "JM", email: "juan@siga.co", role: "Administrador", activity: "Hoy, 08:42", active: true },
  { name: "Carlos Rodríguez", initials: "CR", email: "carlos@siga.co", role: "Trabajador de campo", activity: "Hoy, 07:18", active: true },
  { name: "Ana Méndez", initials: "AM", email: "ana@siga.co", role: "Trabajador de campo", activity: "Ayer, 16:34", active: true },
  { name: "Luis Pérez", initials: "LP", email: "luis@siga.co", role: "Trabajador de campo", activity: "05 jun 2025", active: false },
];

function UsersPage() {
  const [modal, setModal] = useState(false);
  return <div className="page-content">
    <section className="access-note"><span><Icon name="alert" /></span><div><strong>Control de acceso por roles</strong><p>Los administradores gestionan la configuración y los reportes. El personal de campo solo accede al calendario y a los registros operativos.</p></div></section>
    <section className="panel table-panel"><div className="table-toolbar"><div className="search-box"><Icon name="search" size={18} /><input placeholder="Buscar por nombre o correo..." /></div><Button icon="plus" onClick={() => setModal(true)}>Nuevo usuario</Button></div><div className="table-wrap"><table><thead><tr><th>USUARIO</th><th>CORREO</th><th>ROL</th><th>ÚLTIMA ACTIVIDAD</th><th>ESTADO</th><th /></tr></thead><tbody>{users.map((user) => <tr key={user.email}><td><div className="worker"><span className="avatar pale">{user.initials}</span><strong>{user.name}</strong></div></td><td>{user.email}</td><td><span className={`role-badge ${user.role === "Administrador" ? "admin" : ""}`}>{user.role}</span></td><td>{user.activity}</td><td><span className={`status ${user.active ? "active" : "inactive"}`}><i />{user.active ? "Activo" : "Inactivo"}</span></td><td><button className="round-more"><Icon name="more" /></button></td></tr>)}</tbody></table></div></section>
    {modal && <div className="modal-backdrop" onMouseDown={() => setModal(false)}><div className="modal" onMouseDown={(e) => e.stopPropagation()}><div className="modal-title"><div><span className="eyebrow">CONTROL DE ACCESO</span><h2>Crear usuario</h2></div><button onClick={() => setModal(false)}>×</button></div><p>El usuario recibirá acceso según el rol seleccionado.</p><form onSubmit={(e) => { e.preventDefault(); setModal(false); }}><label>Nombre completo<input placeholder="Nombre y apellidos" required /></label><label>Correo electrónico<input type="email" placeholder="nombre@siga.co" required /></label><div className="form-row"><label>Contraseña<input type="password" placeholder="Mínimo 8 caracteres" required /></label><label>Rol<select><option>Trabajador de campo</option><option>Administrador</option></select></label></div><div className="modal-actions"><Button variant="secondary" onClick={() => setModal(false)}>Cancelar</Button><Button type="submit">Crear usuario</Button></div></form></div></div>}
  </div>;
}

function AdminApp({ view, setView, logout }: { view: View; setView: (v: View) => void; logout: () => void }) {
  const [mobileNav, setMobileNav] = useState(false);
  const meta = pageMeta[view] || pageMeta.dashboard!;
  return (
    <div className="admin-shell">
      <div className={mobileNav ? "mobile-nav open" : "mobile-nav"} onClick={() => setMobileNav(false)}><Sidebar view={view} setView={(v) => { setView(v); setMobileNav(false); }} logout={logout} /></div>
      <Sidebar view={view} setView={setView} logout={logout} />
      <main className="admin-main"><Topbar title={meta[0]} subtitle={meta[1]} openMenu={() => setMobileNav(true)} />{view === "dashboard" && <Dashboard />}{view === "lotes" && <LotsPage />}{view === "calendario" && <CalendarPage />}{view === "insumos" && <SuppliesPage />}{view === "cosechas" && <HarvestsPage />}{view === "reportes" && <ReportsPage />}{view === "usuarios" && <UsersPage />}</main>
    </div>
  );
}

const fieldMeta: Partial<Record<View, [string, string]>> = {
  field: ["Buenos días, Carlos", "Jueves, 12 de junio"],
  "field-calendar": ["Mi calendario", "Aplicaciones programadas"],
  "field-application": ["Registrar aplicación", "Completa los datos de la labor"],
  "field-harvest": ["Registrar cosecha", "Producción diaria por lote"],
};

function FieldHeader({ view, goBack, logout }: { view: View; goBack: () => void; logout: () => void }) {
  const [title, subtitle] = fieldMeta[view]!;
  return <header className="field-header"><div className="field-brand"><Brand compact /></div><div className="field-heading">{view !== "field" && <button onClick={goBack}>‹</button>}<div><h1>{title}</h1><p>{subtitle}</p></div></div><button className="field-avatar" onClick={logout}>CR</button></header>;
}

function FieldApp({ view, setView, logout }: { view: View; setView: (v: View) => void; logout: () => void }) {
  const [success, setSuccess] = useState("");
  const submit = (message: string) => (e: FormEvent) => { e.preventDefault(); setSuccess(message); };
  return (
    <div className="field-shell">
      <FieldHeader view={view} goBack={() => { setSuccess(""); setView("field"); }} logout={logout} />
      {view === "field" && <main className="field-content"><section className="field-hero"><span className="field-hero-icon"><Icon name="sprout" /></span><div><span>RESUMEN DE HOY</span><strong>2 labores pendientes</strong><p>Completa tus actividades antes de las 4:00 p. m.</p></div></section><h2 className="field-section-title">¿Qué necesitas hacer?</h2><div className="quick-actions"><QuickAction icon="calendar" color="blue" title="Consultar calendario" text="Revisa tus próximas labores" onClick={() => setView("field-calendar")} /><QuickAction icon="flask" color="green" title="Registrar aplicación" text="Reporta una labor realizada" onClick={() => setView("field-application")} /><QuickAction icon="harvest" color="amber" title="Registrar cosecha" text="Ingresa la producción del día" onClick={() => setView("field-harvest")} /></div><section className="today-card"><div className="today-head"><div><h2>Labores de hoy</h2><p>Jueves, 12 de junio</p></div><span>2 pendientes</span></div><div className="today-task"><i className="task-time">07:30</i><div><span className="tag red">FUNGICIDA</span><strong>Control de sigatoka</strong><p>El Porvenir · 4,2 ha</p></div><Icon name="chevron" /></div><div className="today-task"><i className="task-time">14:00</i><div><span className="tag green">FERTILIZANTE</span><strong>Aplicación NPK 15-15-15</strong><p>La Esperanza · 3,5 ha</p></div><Icon name="chevron" /></div></section></main>}
      {view === "field-calendar" && <main className="field-content"><section className="mobile-panel"><div className="day-tabs"><button><span>MIÉ</span><b>11</b></button><button className="active"><span>JUE</span><b>12</b></button><button><span>VIE</span><b>13</b></button><button><span>SÁB</span><b>14</b></button></div><h2>2 labores para hoy</h2><AgendaItem color="amber" title="Control de sigatoka" meta="El Porvenir · 07:30 a. m." type="Fungicida" /><AgendaItem color="green" title="Aplicación NPK 15-15-15" meta="La Esperanza · 02:00 p. m." type="Fertilizante" /></section></main>}
      {view === "field-application" && <main className="field-content"><MobileForm success={success} onSubmit={submit("Aplicación registrada correctamente.")} type="application" /></main>}
      {view === "field-harvest" && <main className="field-content"><MobileForm success={success} onSubmit={submit("Cosecha registrada correctamente.")} type="harvest" /></main>}
      <nav className="bottom-nav"><button className={view === "field" ? "active" : ""} onClick={() => setView("field")}><Icon name="grid" /><span>Inicio</span></button><button className={view === "field-calendar" ? "active" : ""} onClick={() => setView("field-calendar")}><Icon name="calendar" /><span>Calendario</span></button><button className={view.includes("application") || view.includes("harvest") ? "active" : ""} onClick={() => setView("field-application")}><Icon name="plus" /><span>Registrar</span></button></nav>
    </div>
  );
}

function QuickAction({ icon, color, title, text, onClick }: { icon: IconName; color: string; title: string; text: string; onClick: () => void }) {
  return <button className="quick-action" onClick={onClick}><span className={color}><Icon name={icon} /></span><div><strong>{title}</strong><p>{text}</p></div><Icon name="chevron" /></button>;
}

function MobileForm({ success, onSubmit, type }: { success: string; onSubmit: (e: FormEvent) => void; type: "application" | "harvest" }) {
  const [quality, setQuality] = useState("Primera");
  return <form className="mobile-form" onSubmit={onSubmit}>{success && <div className="mobile-success"><span><Icon name="check" /></span><div><strong>Registro guardado</strong><p>{success}</p></div></div>}<section className="mobile-panel">{type === "application" ? <><label>Producto o insumo<select><option>Mancozeb 80 WP · 12 kg disp.</option><option>NPK 15-15-15 · 46 kg disp.</option></select></label><label>Dosis aplicada<div className="input-unit"><input type="number" placeholder="0,0" required /><select><option>kg</option><option>litros</option></select></div></label><label>Responsable<input defaultValue="Carlos Rodríguez" /></label><label>Evidencia fotográfica<button className="upload" type="button"><span><Icon name="camera" /></span><strong>Tomar o cargar fotografía</strong><small>JPG o PNG · Máximo 10 MB</small></button></label></> : <><label>Lote<select><option>La Esperanza · 3,5 ha</option><option>El Porvenir · 4,2 ha</option></select></label><label>Fecha de cosecha<input type="date" defaultValue="2025-06-12" /></label><label>Cantidad total<div className="input-unit"><input type="number" placeholder="0,0" required /><b>kg</b></div></label><fieldset><legend>Calidad de la cosecha</legend><div className="quality-options">{["Primera","Segunda","Descarte"].map(q=><button type="button" key={q} className={quality===q ? "selected" : ""} onClick={()=>setQuality(q)}><span>{quality===q && <Icon name="check" size={15} />}</span>{q}</button>)}</div></fieldset></>}<label>Observaciones <small>(opcional)</small><textarea rows={3} placeholder="Agrega detalles de la labor..." /></label></section><Button type="submit" className="full field-submit">{type === "application" ? "Guardar aplicación" : "Guardar cosecha"} <Icon name="check" /></Button></form>;
}

export default function App() {
  const [view, setView] = useState<View>("login");
  if (view === "login") return <Login onLogin={(role) => setView(role === "admin" ? "dashboard" : "field")} />;
  if (view.startsWith("field")) return <FieldApp view={view} setView={setView} logout={() => setView("login")} />;
  return <AdminApp view={view} setView={setView} logout={() => setView("login")} />;
}
