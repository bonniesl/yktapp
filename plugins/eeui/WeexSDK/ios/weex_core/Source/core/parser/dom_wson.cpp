/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
//
// Created by furture on 2018/5/15.
//

#include <list>
#include "core/render/node/render_object.h"
#include "core/render/page/render_page.h"
#include "core/render/node/factory/render_creator.h"
#include "dom_wson.h"
#include "wson/wson.h"
#include "wson/wson_parser.h"
//#ifdef test_log
#include "core/config/core_environment.h"
//#else
//#define LOGW
//#define LOGE
//#endif

namespace WeexCore {



    inline bool  keys_order_as_expect(RenderObject *render, bool keyOrderRight){
        return (render != nullptr && keyOrderRight);
    }


    /**
     * parser wson to render object
     * */
    RenderObject *parserWson2RenderObject(wson_parser& parser, RenderObject *parent, int index, const std::string &pageId, bool reserveStyles){
        int objectType = parser.nextType();
        if(!parser.isMap(objectType)){
            parser.skipValue(objectType);
            return nullptr;
        }
        /**
         * because strem key order specified, so will cann't dependecy it's keys order,
         * if key orders right parse one time, if not first parse ref type create render object
         * then parse others attrs
         * */
        int size = parser.nextMapSize();
        std::string ref;
        std::string renderType;
        RenderObject *render = nullptr;
        int state = parser.getState();
        bool keyOrderRight = true;
        for(int i=0; i < size; i++){
            std::string objectKey = parser.nextMapKeyUTF8();
            if(0 == strcmp(objectKey.c_str(), "ref")){
                ref = parser.nextStringUTF8(parser.nextType());
                if (render != nullptr) {
                    // ref may be after type, so need set to render
                    render->set_ref(ref);
                }
            }else if (0 == strcmp(objectKey.c_str(), "type")) {
                renderType = parser.nextStringUTF8(parser.nextType());
                render = (RenderObject *) RenderCreator::GetInstance()->CreateRender(renderType, ref);
                render->set_page_id(pageId);
                if (parent != nullptr){
                    parent->AddRenderObject(index, render);
                }
            }else if (0 == strcmp(objectKey.c_str(), "attr")){ //attr is map object
                uint8_t attrType = parser.nextType();
                if(parser.isMap(attrType) && keys_order_as_expect(render, keyOrderRight)){
                    int attrMapSize = parser.nextMapSize();
                    for(int attrIndex=0; attrIndex<attrMapSize; attrIndex++){
                        std::string attrKeyString = parser.nextMapKeyUTF8();
                        std::string attrValueString = parser.nextStringUTF8(parser.nextType());
                        render->AddAttr(attrKeyString, attrValueString);
                    }
                }else{
                    keyOrderRight = keys_order_as_expect(render, keyOrderRight);
                    parser.skipValue(attrType);
                }
            }else if (0 == strcmp(objectKey.c_str(), "style")){ //style is map object
                uint8_t styleType = parser.nextType();
                if(parser.isMap(styleType) && keys_order_as_expect(render, keyOrderRight)){
                    int styleMapSize = parser.nextMapSize();
                    for(int styleIndex=0; styleIndex<styleMapSize; styleIndex++){
                        std::string styleKeyString = parser.nextMapKeyUTF8();
                        std::string styleValueString = parser.nextStringUTF8(parser.nextType());
                        render->AddStyle(styleKeyString, styleValueString, reserveStyles);
                    }
                }else{
                    keyOrderRight = keys_order_as_expect(render, keyOrderRight);
                    parser.skipValue(styleType);
                }
            }else if (0 == strcmp(objectKey.c_str(), "event")) {//event is array
                uint8_t  eventType = parser.nextType();
                if(parser.isArray(eventType) && keys_order_as_expect(render, keyOrderRight)){
                    int eventSize = parser.nextArraySize();
                    for(int eventIndex=0; eventIndex < eventSize; eventIndex++){
                        std::string eventValue = parser.nextStringUTF8(parser.nextType());
                        if(eventValue.size() > 0){
                            render->AddEvent(eventValue);
                        }
                    }
                }else{
                    keyOrderRight = keys_order_as_expect(render, keyOrderRight);
                    parser.skipValue(eventType);
                }
            }else if (0 == strcmp(objectKey.c_str(), "children")) {
                uint8_t  childType = parser.nextType();
                if(parser.isArray(childType) && keys_order_as_expect(render, keyOrderRight)){
                    int childSize = parser.nextArraySize();
                    for(int childIndex=0; childIndex < childSize; childIndex++){
                        parserWson2RenderObject(parser, render, childIndex, pageId, reserveStyles);
                    }
                }else{
                    keyOrderRight = keys_order_as_expect(render, keyOrderRight);
                    parser.skipValue(childType);
                }
            }else{
                parser.skipValue(parser.nextType());
            }
        }

        /**
         * if key order not right, parse attr&style  events children again
         * */
        if(!keyOrderRight && render != nullptr){
            parser.restoreToState(state);
            for(int i=0; i < size; i++){
                std::string objectKey = parser.nextMapKeyUTF8();
                if (0 == strcmp(objectKey.c_str(), "attr")){ //attr is map object
                    uint8_t attrType = parser.nextType();
                    if(parser.isMap(attrType)){
                        int attrMapSize = parser.nextMapSize();
                        for(int attrIndex=0; attrIndex<attrMapSize; attrIndex++){
                            std::string attrKeyString = parser.nextMapKeyUTF8();
                            std::string attrValueString = parser.nextStringUTF8(parser.nextType());
                            render->AddAttr(attrKeyString, attrValueString);
                        }
                    }else{
                        parser.skipValue(attrType);
                    }
                }else if (0 == strcmp(objectKey.c_str(), "style")){ //style is map object
                    uint8_t styleType = parser.nextType();
                    if(parser.isMap(styleType)){
                        int styleMapSize = parser.nextMapSize();
                        for(int styleIndex=0; styleIndex<styleMapSize; styleIndex++){
                            std::string styleKeyString = parser.nextMapKeyUTF8();
                            std::string styleValueString = parser.nextStringUTF8(parser.nextType());
                            render->AddStyle(styleKeyString, styleValueString, reserveStyles);
                        }
                    }else{
                        parser.skipValue(styleType);
                    }
                }else if (0 == strcmp(objectKey.c_str(), "event")) {//event is array
                    uint8_t  eventType = parser.nextType();
                    if(parser.isArray(eventType)){
                        int eventSize = parser.nextArraySize();
                        for(int eventIndex=0; eventIndex < eventSize; eventIndex++){
                            std::string eventValue = parser.nextStringUTF8(parser.nextType());
                            if(eventValue.size() > 0){
                                render->AddEvent(eventValue);
                            }
                        }
                    }else{;
                        parser.skipValue(eventType);
                    }
                }else if (0 == strcmp(objectKey.c_str(), "children")) {
                    uint8_t  childType = parser.nextType();
                    if(parser.isArray(childType)){
                        int childSize = parser.nextArraySize();
                        for(int childIndex=0; childIndex < childSize; childIndex++){
                            parserWson2RenderObject(parser, render, childIndex, pageId, reserveStyles);
                        }
                    }else{
                        parser.skipValue(childType);
                    }
                }else{
                    parser.skipValue(parser.nextType());
                }
            }
        }


        if (render != nullptr) {
            render->ApplyDefaultStyle(reserveStyles);
            render->ApplyDefaultAttr();
        }
        return render;
    }



    RenderObject *parserWson2RenderObjectNew(wson_parser& parser, RenderObject *parent, int index, const std::string &pageId,bool reserveStyles){
        int objectType = parser.nextType();
        if(!parser.isMap(objectType)){
            parser.skipValue(objectType);
            return nullptr;
        }

        /**
         * because strem key order specified, so will cann't dependecy it's keys order,
         * if key orders right parse one time, if not first parse ref type create render object
         * then parse others attrs
         * */
        int size = parser.nextMapSize();
        std::string ref;
        std::string renderType;
        std::map<std::string, std::string> attrs;
        std::map<std::string, std::string> styles;
        std::vector<std::string> events;
        std::vector<RenderObject*> childrens;

        RenderObject *render = nullptr;
        for(int i=0; i < size; i++){
            std::string objectKey = parser.nextMapKeyUTF8();
            if(0 == strcmp(objectKey.c_str(), "ref")){
                ref = parser.nextStringUTF8(parser.nextType());
            }else if (0 == strcmp(objectKey.c_str(), "type")) {
                renderType = parser.nextStringUTF8(parser.nextType());
            }else if (0 == strcmp(objectKey.c_str(), "attr")){ //attr is map object
                uint8_t attrType = parser.nextType();
                if(parser.isMap(attrType)){
                    int attrMapSize = parser.nextMapSize();
                    for(int attrIndex=0; attrIndex<attrMapSize; attrIndex++){
                        std::string attrKeyString = parser.nextMapKeyUTF8();
                        std::string attrValueString = parser.nextStringUTF8(parser.nextType());
                        attrs.insert({attrKeyString, attrValueString});
                    }
                }else{
                    parser.skipValue(attrType);
                }
            }else if (0 == strcmp(objectKey.c_str(), "style")){ //style is map object
                uint8_t styleType = parser.nextType();
                if(parser.isMap(styleType)){
                    int styleMapSize = parser.nextMapSize();
                    for(int styleIndex=0; styleIndex<styleMapSize; styleIndex++){
                        std::string styleKeyString = parser.nextMapKeyUTF8();
                        std::string styleValueString = parser.nextStringUTF8(parser.nextType());
                        styles.insert({styleKeyString, styleValueString});
                    }
                }else{
                    parser.skipValue(styleType);
                }
            }else if (0 == strcmp(objectKey.c_str(), "event")) {//event is array
                uint8_t  eventType = parser.nextType();
                if(parser.isArray(eventType)){
                    int eventSize = parser.nextArraySize();
                    for(int eventIndex=0; eventIndex < eventSize; eventIndex++){
                        std::string eventValue = parser.nextStringUTF8(parser.nextType());
                        if(eventValue.size() > 0){
                            events.push_back(eventValue);
                        }
                    }
                }else{
                    parser.skipValue(eventType);
                }
            }else if (0 == strcmp(objectKey.c_str(), "children")) {
                uint8_t  childType = parser.nextType();
                if(parser.isArray(childType)){
                    int childSize = parser.nextArraySize();
                    for(int childIndex=0; childIndex < childSize; childIndex++){
                        RenderObject* child = parserWson2RenderObjectNew(parser, nullptr, childIndex, pageId,reserveStyles);
                        if(child != nullptr){
                            childrens.push_back(child);
                        }
                    }
                }else{
                    parser.skipValue(childType);
                }
            }else{
                parser.skipValue(parser.nextType());
            }
        }

        render = (RenderObject *) RenderCreator::GetInstance()->CreateRender(renderType, ref);
        render->set_page_id(pageId);


        for(auto& it : attrs){
            render->AddAttr(it.first, it.second);
        }

        for(auto& it : styles){
            render->AddStyle(it.first, it.second,reserveStyles);
        }

        for(auto& it : events){
            render->AddEvent(it);
        }

        int childIndex = 0;
        for(auto& child : childrens){
            render->AddRenderObject(childIndex, child);
            childIndex++;
        }


        if (render != nullptr) {
            render->ApplyDefaultStyle(reserveStyles);
            render->ApplyDefaultAttr();
        }
        return render;
    }


    RenderObject *Wson2RenderObject(const char *data, const std::string &pageId,bool reserveStyles){
        if(!data){
            return nullptr;
        }
        wson_parser parser(data);
        RenderObject* res;
        if (WXCoreEnvironment::getInstance()->isUseRunTimeApi()){
            res=  parserWson2RenderObjectNew(parser,nullptr,0,pageId,reserveStyles);
        } else{
            res= parserWson2RenderObject(parser, nullptr, 0, pageId,reserveStyles);
        }
        return res;
    }

    std::vector<std::pair<std::string, std::string>> *Wson2Pairs(const char *data){
        if(!data){
            return nullptr;
        }
        wson_parser parser(data);
        std::vector<std::pair<std::string, std::string>> *pairs = nullptr;
        uint8_t  type = parser.nextType();
        if(parser.isMap(type)){
            pairs = new std::vector<std::pair<std::string, std::string>>();
            int mapSize = parser.nextMapSize();
            for(int index=0; index < mapSize; index++){
                std::string mapKeyString = parser.nextMapKeyUTF8();
                std::string mapValueString = parser.nextStringUTF8(parser.nextType());
                std::pair<std::string, std::string> mapPair(mapKeyString, mapValueString);
                pairs->insert(pairs->end(), mapPair);
            }
        }
        return pairs;
    };
    
    static void WsonGenerate(wson_parser& parser, const std::string& parentRef, int index, const WsonObjectGenerator& genObject) {
        int objectType = parser.nextType();
        if(!parser.isMap(objectType)){
            parser.skipValue(objectType);
            return;
        }
        /**
         * because strem key order specified, so will cann't dependecy it's keys order,
         * if key orders right parse one time, if not first parse ref type create render object
         * then parse others attrs
         * */
        std::string ref;
        std::string renderType;
        std::map<std::string, std::string>* styles = new std::map<std::string, std::string>();
        std::map<std::string, std::string>* attrs = new std::map<std::string, std::string>();
        std::set<std::string>* events = new std::set<std::string>();
        
        int size = parser.nextMapSize();
        int state = parser.getState();
        for(int i=0; i < size; i++){
            std::string objectKey = parser.nextMapKeyUTF8();
            if(0 == strcmp(objectKey.c_str(), "ref")){
                ref = parser.nextStringUTF8(parser.nextType());
            }else if (0 == strcmp(objectKey.c_str(), "type")) {
                renderType = parser.nextStringUTF8(parser.nextType());
            }else if (0 == strcmp(objectKey.c_str(), "attr")){ //attr is map object
                uint8_t attrType = parser.nextType();
                if(parser.isMap(attrType)){
                    int attrMapSize = parser.nextMapSize();
                    for(int attrIndex=0; attrIndex<attrMapSize; attrIndex++){
                        std::string attrKeyString = parser.nextMapKeyUTF8();
                        std::string attrValueString = parser.nextStringUTF8(parser.nextType());
                        (*attrs)[attrKeyString] = attrValueString;
                    }
                }
            }else if (0 == strcmp(objectKey.c_str(), "style")){ //style is map object
                uint8_t styleType = parser.nextType();
                if(parser.isMap(styleType)){
                    int styleMapSize = parser.nextMapSize();
                    for(int styleIndex=0; styleIndex<styleMapSize; styleIndex++){
                        std::string styleKeyString = parser.nextMapKeyUTF8();
                        std::string styleValueString = parser.nextStringUTF8(parser.nextType());
                        (*styles)[styleKeyString] = styleValueString;
                    }
                }
            }else if (0 == strcmp(objectKey.c_str(), "event")) {//event is array
                uint8_t eventType = parser.nextType();
                if(parser.isArray(eventType)){
                    int eventSize = parser.nextArraySize();
                    for(int eventIndex=0; eventIndex < eventSize; eventIndex++){
                        std::string eventValue = parser.nextStringUTF8(parser.nextType());
                        if(eventValue.size() > 0){
                            events->insert(eventValue);
                        }
                    }
                }
            }else{
                // skip children
                parser.skipValue(parser.nextType());
            }
        }
        
        // gen one object
        if (!renderType.empty() && !ref.empty()) {
            genObject(ref, renderType, parentRef, styles, attrs, events, index);
            
            // parse children
            parser.restoreToState(state);
            for(int i=0; i < size; i++){
                std::string objectKey = parser.nextMapKeyUTF8();
                if (0 == strcmp(objectKey.c_str(), "children")) {
                    uint8_t childType = parser.nextType();
                    if (parser.isArray(childType)){
                        int childSize = parser.nextArraySize();
                        for(int childIndex=0; childIndex < childSize; childIndex++){
                            WsonGenerate(parser, ref, childIndex, genObject);
                        }
                    } else {
                        break;
                    }
                } else {
                    parser.skipValue(parser.nextType());
                }
            }
        }
        else {
            delete styles;
            delete attrs;
            delete events;
        }
    }

    void WsonGenerate(const char* data, const std::string& parentRef, int index, const WsonObjectGenerator& genObject) {
        if (!data) {
            return;
        }
        wson_parser parser(data);
        WsonGenerate(parser, parentRef, index, genObject);
    }
    
}
