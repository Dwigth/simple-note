(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
class HTTPController {
    constructor() { }
    static POST(data, uri) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(config_1.URL + uri, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: config_1.header
            }).then(res => res.json())
                .catch(error => error)
                .then((response) => response);
        });
    }
    static GET(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(config_1.URL + uri, {
                method: 'GET',
                headers: config_1.header
            }).then(res => res.json())
                .catch(error => error)
                .then((response) => response);
        });
    }
}
exports.HTTPController = HTTPController;

},{"../config/config":5}],2:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vista_controller_1 = require("./vista.controller");
const notas_service_1 = require("../services/notas.service");
class InputController {
    constructor() {
        this.notas = [];
        this.ITitulo = document.getElementById('ITitulo');
        this.IContenido = document.getElementById('IContenido');
        this.IContenedor = document.getElementById('IContenedor');
        this.IConfirmacion = document.getElementById('IConfirmacion');
        this.ILista = document.getElementById('ILista');
        this.IRefresh = document.getElementById('IRefresh');
        this.IConfirmacion.addEventListener('click', () => { this.save(); this.afterClickIContenido('none'); });
        this.IContenido.addEventListener('click', () => {
            this.afterClickIContenido('initial');
        });
        this.afterClickIContenido('none');
        this.getNotas();
        this.IRefresh.addEventListener('click', () => { this.refresh(); });
    }
    getNotas() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield notas_service_1.NotasService.obtenerNotas();
            console.log(data);
            let notas = (data.data != undefined) ? Array.from(data.data) : [];
            this.notas = notas;
            let vc = new vista_controller_1.VistaController(this.notas).renderNotas(this.IContenedor);
        });
    }
    getITitulo() {
        return (this.ITitulo != null) ? this.ITitulo.value : 'Objeto es nulo';
    }
    getIContenido() {
        return (this.IContenido != null) ? this.IContenido.value : 'Objeto es nulo';
    }
    afterClickIContenido(status) {
        this.ITitulo.style.display = status;
        this.IConfirmacion.style.display = status;
        this.ILista.style.display = status;
    }
    save() {
        var nota = { titulo: this.getITitulo(), contenido: this.getIContenido(), id_usuario: 1, lista: false };
        if (nota.contenido !== '') {
            notas_service_1.NotasService.agregarNota(nota);
            this.notas[this.notas.length - 1].push(nota);
            let vc = new vista_controller_1.VistaController(this.notas).renderNotas(this.IContenedor);
            this.clean();
            this.getNotas();
        }
    }
    clean() {
        this.ITitulo.value = "";
        this.IContenido.value = "";
    }
    refresh() {
        this.IRefresh.classList.add('refresh');
        setTimeout(() => {
            this.getNotas();
            this.IRefresh.classList.remove('refresh');
        }, 1000);
    }
}
exports.InputController = InputController;

},{"../services/notas.service":6,"./vista.controller":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VistaController {
    constructor(notas) {
        this.notas = notas;
    }
    renderNotas(IContenedor) {
        IContenedor.innerHTML = "";
        this.notas.forEach((notas, index) => {
            let row = document.createElement('div');
            row.classList.add('row');
            notas.forEach((nota) => {
                var elemNota = this.cardBuilder(nota);
                row.appendChild(elemNota);
            });
            IContenedor.append(row);
        });
    }
    cardBuilder(data) {
        const contenedorCard = document.createElement('div');
        contenedorCard.classList.add('three', 'columns', 'nota-card');
        const headerCard = document.createElement('div');
        headerCard.textContent = data.titulo;
        headerCard.classList.add('nota-card-header');
        const contentCard = document.createElement('div');
        contentCard.textContent = data.contenido;
        contentCard.classList.add('nota-card-content');
        const footerCard = document.createElement('div');
        footerCard.classList.add('nota-card-footer', 'row');
        const opt = document.createElement('div');
        opt.classList.add('u-full-width');
        const colors = document.createElement('div');
        const edit = document.createElement('div');
        const more = document.createElement('div');
        colors.classList.add('four', 'columns');
        colors.textContent = '¡Color!';
        edit.textContent = 'Editar';
        edit.classList.add('four', 'columns');
        more.textContent = 'Más';
        more.classList.add('four', 'columns');
        opt.append(colors, edit, more);
        footerCard.appendChild(opt);
        contenedorCard.append(headerCard, contentCard, footerCard);
        return contenedorCard;
    }
}
exports.VistaController = VistaController;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_controller_1 = require("./actions/input.controller");
(() => {
    const IC = new input_controller_1.InputController();
})();

},{"./actions/input.controller":2}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL = 'http://localhost:2405';
exports.header = {
    'Content-Type': 'application/json'
};

},{}],6:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_controller_1 = require("../actions/http.controller");
class NotasService {
    constructor() { }
    static obtenerNotas() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield http_controller_1.HTTPController.GET('/notas/obtener');
        });
    }
    static agregarNota(nota) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield http_controller_1.HTTPController.POST(nota, '/notas/agregar')
                .then(resultado => {
                console.log(resultado);
                return resultado;
            }).catch(e => console.error(e));
        });
    }
}
exports.NotasService = NotasService;

},{"../actions/http.controller":1}]},{},[4]);
