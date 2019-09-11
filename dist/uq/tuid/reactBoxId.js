var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { observer } from 'mobx-react';
const TuidContent = (tuidName, values, x) => {
    return React.createElement(React.Fragment, null,
        tuidName,
        ": ",
        stringify(values));
};
function stringify(values) {
    let s = '{';
    if (values === undefined)
        return 'undefined';
    for (let i in values) {
        let v = values[i];
        s += i + ': ';
        if (v === undefined) {
            s += 'undefined';
        }
        else if (v === null) {
            s += 'null';
        }
        else {
            switch (typeof v) {
                default:
                    s += v;
                    break;
                case 'function':
                    s += 'function';
                    break;
                case 'object':
                    s += '{obj}';
                    break;
            }
        }
        s += ', ';
    }
    return s + '}';
}
export class ReactBoxId {
    constructor(id, tuid, ui) {
        this.id = id;
        this.tuid = tuid;
        this.ui = ui;
        this.isUndefined = (this.tuid === undefined);
    }
    get obj() {
        return this.tuid.valueFromId(this.id);
    }
    render(ui, x) {
        if (this.id === undefined || this.id === null)
            return;
        let boxName = this.boxName; // this.tuid.name;
        let val = this.obj; // this.tuid.valueFromId(this.id);
        if (this.isUndefined === true) {
            if (ui !== undefined)
                return ui(val, x);
            return TuidContent(boxName, val, x);
        }
        switch (typeof val) {
            case 'undefined':
                return React.createElement("del", { className: "text-black-50" },
                    boxName,
                    " undefined");
            case 'number':
                return React.createElement("del", { className: "text-black-50" },
                    boxName,
                    " ",
                    this.id);
        }
        if (ui === undefined) {
            ui = this.ui;
        }
        if (ui !== undefined) {
            if (typeof ui !== 'function') {
                ui = ui.content;
            }
            if (ui !== undefined) {
                let ret = ui(val /*, this.tuidUR.res*/);
                if (ret !== undefined)
                    return ret;
                return React.createElement("del", { className: "text-danger" },
                    boxName,
                    " ",
                    this.id);
            }
        }
        return TuidContent(boxName, val);
    }
    get boxName() { return this.tuid.name; }
    // ui(): TvTemplet {return this.tuid.ui}
    // res(): any {return this.tuid.res}
    assure() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tuid.assureBox(this.id);
        });
    }
}
function boxIdContent(bi, ui, x) {
    let logContent;
    let boxId = bi;
    switch (typeof bi) {
        case 'undefined':
            logContent = React.createElement(React.Fragment, null, "boxId undefined");
            break;
        case 'number':
            logContent = React.createElement(React.Fragment, null,
                "id:",
                bi);
            break;
        default:
            if (typeof boxId.render !== 'function') {
                if (ui === undefined) {
                    logContent = TuidContent(bi.boxName, bi, x);
                }
                else {
                    return ui(bi, x);
                }
            }
            break;
    }
    if (logContent !== undefined) {
        return React.createElement("del", { className: "text-danger" }, logContent);
    }
    return boxId.render(ui, x);
}
const Tv = observer(({ tuidValue, ui, x, nullUI }) => {
    if (tuidValue === undefined) {
        if (nullUI === undefined)
            return React.createElement(React.Fragment, null, "[undefined]");
        return nullUI();
    }
    if (tuidValue === null) {
        if (nullUI === undefined)
            return React.createElement(React.Fragment, null, "[null]");
        return nullUI();
    }
    let ttv = typeof tuidValue;
    switch (ttv) {
        default:
            if (ui === undefined)
                return React.createElement(React.Fragment, null,
                    ttv,
                    "-",
                    tuidValue);
            else {
                let ret = ui(tuidValue, x);
                if (ret !== undefined)
                    return ret;
                return React.createElement(React.Fragment, null, tuidValue);
            }
        case 'object':
            let divObj = boxIdContent(tuidValue, ui, x);
            if (divObj !== undefined)
                return divObj;
            return nullUI === undefined ? React.createElement(React.Fragment, null, "id null") : nullUI();
        case 'number':
            return React.createElement(React.Fragment, null,
                "id...",
                tuidValue);
    }
});
export const tv = (tuidValue, ui, x, nullUI) => {
    return React.createElement(Tv, { tuidValue: tuidValue, ui: ui, x: x, nullUI: nullUI });
};
//# sourceMappingURL=reactBoxId.js.map