"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var pg_1 = require("pg");
var PORT = process.env.PORT || 3000;
var client = new pg_1.Client({
    password: "postgres",
    user: "postgres",
    host: "postgres",
});
var bootScript = "create table if not exists uscoviddata (Date date, County VARCHAR(100),State VARCHAR(100), Fips INTEGER, Cases INTEGER,Deaths INTEGER); COPY uscoviddata FROM '/home/adnan/Documents/Alturos Demo Project/NodeServer/us-counties.csv' delimiter ',' csv header;";
var app = express_1.default();
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.get("/ping", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var database;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.query(bootScript).then(function () { return "up"; }).catch(function () { return "down"; })];
            case 1:
                database = _a.sent();
                res.send({
                    environment: process.env.NODE_ENV,
                    database: database,
                });
                return [2 /*return*/];
        }
    });
}); });
app.get("/all", function (req, res) {
    client.query('SELECT * FROM uscoviddata WHERE Cases > 0').then(function (queryRes) {
        var resultOfQuery = queryRes.rows;
        //console.log(resultOfQuery);
        res.end(JSON.stringify(resultOfQuery));
    }).catch(function (e) { return console.error(e.stack); });
});
app.get("/dbSize", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        client.query("SELECT COUNT(*) FROM uscoviddata").then(function (queryRes) {
            var resultOfQuery = queryRes.rows;
            res.end(JSON.stringify(resultOfQuery));
        }).catch(function (e) { return console.error(e.stack); });
        return [2 /*return*/];
    });
}); });
(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.connect()];
            case 1:
                _a.sent();
                app.listen(PORT, function () {
                    console.log("Started at http://localhost:%d", PORT);
                });
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=index.js.map